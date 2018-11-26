import React, { Component } from "react";
import { API } from "aws-amplify";
import { PageHeader, DropdownButton, MenuItem } from "react-bootstrap";
import "react-table/react-table.css";
import Calendar from "./calendar";
import PomaAddTaskModal from "../../components/PomaAddTaskModal";
import PomaAddProjectModal from "../../components/PomaAddProjectModal";

export default class PomaHome extends Component {

	constructor(props) {
        super(props);
		this.state = {
			isLoading: true,
			email: false,
			firstname: "",
			lastname: "",
			showAddTaskModal: false,
			showAddProjectModal: false
		};
	}

	createTask = () => {
		this.setState({ showAddTaskModal: true });
	}

	createProgram = () => {
		this.setState({ showAddProjectModal: true });
	}

	handleTaskModalHide = (data, isSubmit) => {
		this.setState({ showAddTaskModal: false });
		if (!isSubmit) {
			return;
		} else {
			const { projectId, taskName, taskDescription, taskPomodoroCount } = data;
			API.post("api", "/api/task", {
				body: {
					projectId,
					taskName,
					taskDescription,
					taskStatus: "New",
					taskPomodoroCount,
					userId: this.props.id,
				}
			});
		}
	}

	handleProjectModalHide = (data, isSubmit) => {
		this.setState({ showAddProjectModal: false });
		if (!isSubmit) {
			return;
		} else {
			const { projectName, projectDescription, projectContributorsIDs, startDate, endDate } = data;
			API.post("api", "/api/project", {
				body: {
					projectName,
					projectDescription,
					projectStatus: "New",
					projectOwner: this.props.id,
					projectContributors: projectContributorsIDs,
					projectStartDate: startDate.format('X'),
					projectEndDate: endDate.format('X'),
				}
			});
		}
	}

	render() {
		const { showAddProjectModal, showAddTaskModal } = this.state;
		return (
			<div className="notes">
				<PageHeader>
					Welcome {this.props.firstname} {this.props.lastname}
						<DropdownButton
							bsStyle="btn-add pull-right transition"
							title={<span><i className="fa fa-plus fa-fw"></i>Create</span>}
							noCaret
							id="dropdown-no-caret"
							className="btn-add"
						>
							<MenuItem eventKey="1" onClick={this.createTask}>Task</MenuItem>
							<MenuItem eventKey="2" onClick={this.createProgram}>Project</MenuItem>
						</DropdownButton>
				</PageHeader>
                <Calendar/>
				<PomaAddTaskModal show={showAddTaskModal} handleClose={this.handleTaskModalHide} id={this.props.id}/>
				<PomaAddProjectModal show={showAddProjectModal} handleClose={this.handleProjectModalHide}/>
			</div>
		);
	}
}