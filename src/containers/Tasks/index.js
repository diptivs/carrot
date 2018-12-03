import { API } from "aws-amplify";
import React, { Component } from "react";
import { Panel, Alert, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import classNames from "classnames";
import "./tasks.css";
import { TASK_STATUS } from "../../constants";

const { DONE } = TASK_STATUS;

export default class Tasks extends Component {

	constructor(props) {
		super(props);
		this.state = {
			projects: [],
			loading: true
		};
	};

	async componentDidMount() {
        if (this.props.id) {
			// Fetch tasks this user is working on
			const projectTaskMap = {};
			const tasks = await this.getUserTasks(this.props.id);
			if (tasks.taskId) {	
				tasks.taskId.values.forEach(async (task) => {
					// Get task info
					const taskInfo = await this.getTaskInfo(task);
					const { projectId } = taskInfo;
					// Get project info for projectId of this task
					const projectInfo = await this.getProjectInfo(projectId);
					// Create and update map obj in state
					const thisTasks = this.state.projects[projectId] ? this.state.projects[projectId].tasks.concat(taskInfo) : [taskInfo];
					projectTaskMap[projectId] = {
						tasks: thisTasks,
						project: projectInfo,
					}
					this.setState({ projects: projectTaskMap, loading: false });
				});
			}
		}
    }

	getUserTasks = (userId) => API.get("api", `/api/user/${userId}`);
	
	getTaskInfo = (taskId) => API.get("api", `/api/task/${taskId}`);

 	getProjectInfo = (projectId) => API.get("api", `/api/project/${projectId}`);

	renderProjectPanel = (project) => {
		const { tasks, project: { projectName } } = project;
		const taskCount = this.countTasks([project]);
		return (
		<Panel key={projectName} id="collapsible-panel-example-2" defaultExpanded>
			<Panel.Heading>
			  	<Panel.Title className="text-center">
					<Panel.Toggle componentClass="a">
						<Badge className="pull-left mr-2">{taskCount.toComplete} left</Badge>
						<Badge className="pull-left">{taskCount.completed} completed</Badge>
					</Panel.Toggle>
					<span className="pointer">{ projectName }</span>
					<Panel.Toggle componentClass="a">
						<span className="pull-right"><i className="far fa-eye"/></span>
						<span className="pull-right"><i className="far fa-eye-slash"/></span>					
					</Panel.Toggle>
			  	</Panel.Title>
			</Panel.Heading>
			<Panel.Collapse>
			  	<Panel.Body>
					{
						tasks.map((task) => {
							const { taskId, taskName, taskStatus, taskDescription } = task;
							return(<div key={taskName} className="inline">
								<LinkContainer to={`/tasks/${taskId}`}>
									<div className={classNames("task-card animated fadeIn", taskStatus === DONE ? "done" : null)}>
										<div className="task-card-title">{taskName}</div>
										<hr className="mb-3 mt-3"/>
										<span>{taskDescription}</span>
									</div>
								</LinkContainer>
							</div>)
						})
					}
			  	</Panel.Body>
			</Panel.Collapse>
		</Panel>
		)
	};

	countTasks = (projects) => {
		let toComplete = 0;
		let completed = 0;
		Object.keys(projects).forEach((project) => {
			const { tasks } = projects[project];
			tasks.forEach((task) => {
				const { taskStatus } = task;
				if (taskStatus === DONE) {
					completed = completed + 1;
				} else {
					toComplete = toComplete + 1;
				}
			})
		})
		return { toComplete, completed }
	}

	
	render() {
		const { projects, loading } = this.state;
		const taskCount = this.countTasks(projects);
		let alert = (
			<Alert className="poma-alert text-center">
				<div><strong>{taskCount.toComplete} </strong>tasks left to complete</div>
				<div><strong>{taskCount.completed} </strong>tasks completed</div>
			</Alert>
		)
		if (!Object.keys(projects).length) {
			alert = (
				<Alert className="info text-center">
					<div><strong>You currently do not have tasks under your account!</strong></div>
					<div>Head back to the homepage and start creating some tasks!</div>
				</Alert>
			)
		}
		if (loading) {
			alert = (
				<div className="text-center mt-3x">
					<i className="fas fa-spinner fa-spin fa-5x mt-100"/>
				</div>
			)
		}
		return (
			<div className="tasks-container animated fadeIn">
				{ alert }
				{
					Object.keys(projects).map((project) => {
						return this.renderProjectPanel(projects[project]);
					})
				}
			</div>
		);
	}
}