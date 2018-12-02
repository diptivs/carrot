import { API } from "aws-amplify";
import React, { Component } from "react";
import { Panel, Alert, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import classNames from "classnames";
import "./manage.css";
import { TASK_STATUS } from "../../constants";
import PomaAddProjectModal from "../../components/PomaAddProjectModal";

const { DONE } = TASK_STATUS;

export default class Manage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			projects: [],
			showAddProjectModal: false,
			addProjectModalData: {},
			loading: true
		};
	};

	async componentDidMount() {
        if (this.props.id) {
			// Fetch tasks this user is working on
            const projects = await this.getUserProjectsAndTasks();
            const projectsList = projects[0];
            projectsList.concat(projects[1]);
            this.setState({ projects: projectsList, loading: false });
        }
    }

	getUserProjectsAndTasks = () => API.get("api", "/api/project/detail");

	getUserTasks = (userId) => API.get("api", `/api/user/${userId}`);

	getTaskInfo = (taskId) => API.get("api", `/api/task/${taskId}`);

	getProjectInfo = (projectId) => API.get("api", `/api/project/${projectId}`);

	handleClick = (projectData) => {
		this.setState({ showAddProjectModal: true, addProjectModalData: projectData })
	};

	handleProjectModalHide = (data, isSubmit) => {
		this.setState({ showAddProjectModal: false });
		if (!isSubmit) {
			return;
		} else {
			const { projectId, projectStatus, projectName, projectDescription, projectContributorsIDs, startDate, endDate } = data;
			API.put("api", `/api/project/${projectId}`, {
				body: {
					projectName,
					projectDescription,
					projectStatus,
					projectOwner: this.props.id,
					projectContributors: projectContributorsIDs,
					projectStartDate: startDate.format('X') * 1000,
					projectEndDate: endDate.format('X')  * 1000,
				}
			});
		}
	}

	renderProjectPanel = (project) => {
		const { tasks, projectName } = project;
		const taskCount = this.countTasks(tasks);
		return (
		<Panel key={projectName} id="collapsible-panel-example-2" defaultExpanded>
			<Panel.Heading>
			  	<Panel.Title className="text-center">
					<Panel.Toggle componentClass="a">
						<Badge className="pull-left mr-2">{taskCount.toComplete} left</Badge>
						<Badge className="pull-left">{taskCount.completed} completed</Badge>
					</Panel.Toggle>
					<span className="pointer" onClick={() => this.handleClick(project)}><i className="fas fa-pencil-alt"/>{ projectName }</span>
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

	countTasks = (tasks) => {
		let toComplete = 0;
		let completed = 0;
		tasks.forEach((task) => {
			const { taskStatus } = task;
			if (taskStatus === DONE) {
				completed = completed + 1;
			} else {
				toComplete = toComplete + 1;
			}
		})
		return { toComplete, completed }
	}

	
	render() {
		const { showAddProjectModal, addProjectModalData, loading } = this.state;
		const { projects } = this.state;
		let alert = null;
		if (!Object.keys(projects).length) {
			alert = (
				<Alert className="info text-center">
					<div><strong>You are currently not managing any projects!</strong></div>
					<div>Head back to the homepage and start creating some!</div>
				</Alert>
			)
		}
		if (loading) {
			alert = (
				<div className="text-center mt-3x">
					<i className="fas fa-spinner fa-spin fa-5x"/>
				</div>
			)
		}
		return (
			<div className="tasks-container animated fadeIn">
				{ alert }
				{
					projects.map((project) => {
						return this.renderProjectPanel(project);
					})
				}
				{
					showAddProjectModal ? <PomaAddProjectModal show={showAddProjectModal} handleClose={this.handleProjectModalHide} data={addProjectModalData} edit/> : null
				}
			</div>
		);
	}
}