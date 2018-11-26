import { API } from "aws-amplify";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./task.css";
import { NONE_VALUE } from "../../constants";

export default class Task extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taskName: null,
			taskPomodoroCount: null,
			taskPomodoroStartTime: null,
			taskPomodoroEndTime: null,
			taskStatus: null,
			projectId: null,
			taskDescription: null,
			firstName: null,
			lastName: null,
			emailId: null,
			taskId: null,
			userId: null
		};
	}
	goBack = () => {
		this.props.history.push("/tasks");
	}

	async componentDidMount() {
		const location = this.props.location.pathname.split("/");
		// Fetch task info
		const taskInfo = await this.getTaskInfo(location[location.length - 1]);
		const { taskName, taskPomodoroCount, taskPomodoroStartTime, taskPomodoroEndTime, taskStatus, projectId, taskDescription, userId, taskId } = taskInfo;
		// Fetch task assignee info
		const userInfo = await this.getUserInfo(userId)
		const { firstName, lastName, emailId } = userInfo;
		// Fetch task project info
		const projectInfo = await this.getProjectInfo(projectId)
		const { projectName } = projectInfo;
		this.setState({
			taskName,
			taskPomodoroCount,
			taskPomodoroStartTime,
			taskPomodoroEndTime,
			taskStatus,
			projectName,
			taskDescription,
			userId,
			firstName,
			lastName,
			emailId,
			taskId
		})
	}

	getTaskInfo = (taskId) => API.get("api", `/api/task/${taskId}`);

	getUserInfo = (userId) => API.get("api", `/api/user/${userId}`);

	getProjectInfo = (projectId) => API.get("api", `/api/project/${projectId}`);

	render() {
		const {
			taskName,
			taskDescription,
			taskPomodoroCount,
			taskPomodoroEndTime,
			taskPomodoroStartTime,
			taskStatus,
			projectName,
			firstName,
			lastName,
			emailId,
			taskId
		} = this.state;
		return (
			<div className="task-container">
				<div className="task-menu-bar animated fadeIn">
					<Button onClick={this.goBack} className="btn-add" bsStyle="btn-add pull-right transition">Back</Button>
				</div>
				<div className="task-card-big done-big shadow animated fadeIn">
					<span className="pull-left">{taskId}</span>
					<span className="pull-right">{taskPomodoroCount} pomodoro's</span>
					<hr className="mb-3"/>
					<div className="text-left pull-left w-60">
						<h3 className="task-card-title-big">{taskName}</h3>
						<span className="task-card-text-block">{taskDescription}</span>
					</div>
					<div className="text-left pull-right w-40">
						<span className="task-card-text-label mt-4x">Task Status:</span>
						<h5 className="task-card-text-block">{taskStatus}</h5>
						<span className="task-card-text-label">Start time:</span>
						<h5 className="task-card-text-block">{taskPomodoroStartTime || NONE_VALUE}</h5>
						<span className="task-card-text-label">End time:</span>
						<h5 className="task-card-text-block">{taskPomodoroEndTime || NONE_VALUE}</h5>
						<span className="task-card-text-label">Assignee:</span>
						<h5 className="task-card-text-block"><i className="fas fa-user fa-fw"/>{`${firstName} ${lastName} - ${emailId}`}</h5>
						<span className="task-card-text-label">Project:</span>
						<h5 className="task-card-text-block">{projectName}</h5>
					</div>
				</div>
			</div>
		);
	}
}