import React, { Component } from "react";
import { PageHeader, DropdownButton, Dropdown, MenuItem } from "react-bootstrap";
import "react-table/react-table.css";
import Calendar from "./calendar";

export default class PomaHome extends Component {

	constructor(props) {
        super(props);
        console.log(props);
		this.state = {
			isLoading: true,
			email: false,
			firstname: "",
			lastname: "",
		};
	}

	createTask() {
		console.log('create task');
	}

	createProgram() {
		console.log('create program');
	}

	render() {
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
			</div>
		);
	}
}