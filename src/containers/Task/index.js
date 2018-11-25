import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "./task.css";

export default class Task extends Component {

	goBack = () => {
		this.props.history.push("/tasks");
	}
	render() {
		return (
			<div className="task-container">
				<div className="task-menu-bar animated fadeIn">
					<Button onClick={this.goBack} className="btn-add" bsStyle="btn-add pull-right transition">Back</Button>
				</div>
				<div className="task-card-big done-big shadow animated fadeIn">
					<h3 className="task-card-title">Task title is here</h3>
					<hr className="mb-3 mt-3"/>
					<span>This is a description and this is making it super long</span>
				</div>
			</div>
		);
	}
}