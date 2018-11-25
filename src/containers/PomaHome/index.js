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
        console.log(props);
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
		console.log(data, isSubmit);
		const { projectName, projectDescription, projectContributors, projectStartDate, projectEndDate } = data;
		this.setState({ showAddTaskModal: false });
		if (!isSubmit) {
			return;
		}
		API.post("api", "/api/project", {
            body: {
				projectName,
				projectDescription,
				projectStatus: "New",
				projectOwner: null,
				projectContributors: projectContributors,
				projectStartDate,
				projectEndDate,
			}
        });
	}

	handleProjectModalHide = (data, isSubmit) => {
		console.log(data, isSubmit);
		this.setState({ showAddProjectModal: false });
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
				<PomaAddTaskModal show={showAddTaskModal} handleClose={this.handleTaskModalHide}/>
				<PomaAddProjectModal show={showAddProjectModal} handleClose={this.handleProjectModalHide}/>
			</div>
		);
	}
}