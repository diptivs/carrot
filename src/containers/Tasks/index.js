import { API } from "aws-amplify";
import React, { Component } from "react";
import { Panel, Alert, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./tasks.css";

export default class Tasks extends Component {

	constructor(props) {
		super(props);
		this.state = {
		};
	};

	async componentDidMount() {
        if (this.props.id) {
            const projects = await this.getUserProjects(this.props.id);
            this.setState({ projects: projects.Items });
        }
    }

    getUserProjects = (userId) => {
        return API.get("api", "/api/project", {
            queryStringParameters: {
                userId,
            },
        });
    };

	renderProjectPanel = () => {
		return (
		<Panel id="collapsible-panel-example-2" defaultExpanded>
			<Panel.Heading>
			  	<Panel.Title toggle className="text-center">
					<Badge className="pull-left mr-2">7 left</Badge>
					<Badge className="pull-left">3 completed</Badge>
					<span>Project 1</span>
					<span className="pull-right"><i class="far fa-eye"/></span>
					<span className="pull-right"><i class="far fa-eye-slash"/></span>
			  	</Panel.Title>
			</Panel.Heading>
			<Panel.Collapse>
			  	<Panel.Body>
					<div className="inline">
						<LinkContainer to="/tasks/123">
							<div className="task-card done animated fadeIn">
								<div className="task-card-title">Task title is here</div>
								<hr className="mb-3 mt-3"/>
								<span>This is a description and this is making it super long</span>
							</div>
						</LinkContainer>
					</div>
					<div className="inline">
						<LinkContainer to="/tasks/123">
							<div className="task-card animated fadeIn">
								<div className="task-card-title">Task title is here</div>
								<hr className="mb-3 mt-3"/>
								<span className="file-description">This is a description and this is making it super long</span>
							</div>
						</LinkContainer>
					</div>
					<div className="inline">
						<LinkContainer to="/tasks/123">
							<div className="task-card animated fadeIn">
								<div className="task-card-title">Task title is here</div>
								<hr className="mb-3 mt-3"/>
								<span className="file-description">This is a description and this is making it super long</span>
							</div>
						</LinkContainer>
					</div>
					<div className="inline">
						<LinkContainer to="/tasks/123">
							<div className="task-card done animated fadeIn">
								<div className="task-card-title">Task title is here</div>
								<hr className="mb-3 mt-3"/>
								<span className="file-description">This is a description and this is making it super long</span>
							</div>
						</LinkContainer>
					</div>
					<div className="inline">
						<LinkContainer to="/tasks/123">
							<div className="task-card animated fadeIn">
								<div className="task-card-title">Task title is here</div>
								<hr className="mb-3 mt-3"/>
								<span className="file-description">This is a description and this is making it super long</span>
							</div>
						</LinkContainer>
					</div>
			  	</Panel.Body>
			</Panel.Collapse>
		</Panel>
		)
	};

	render() {
		return (
			<div className="tasks-container animated fadeIn">
				<Alert className="poma-alert text-center">
					<div><strong>21 </strong>tasks left to complete</div>
					<div><strong>9 </strong>tasks left completed</div>
				</Alert>
				{this.renderProjectPanel()}
				<hr/>
				{this.renderProjectPanel()}
				<hr/>
				{this.renderProjectPanel()}
			</div>
		);
	}
}