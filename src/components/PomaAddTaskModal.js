import { API } from "aws-amplify";
import _ from "lodash";
import React, { Component } from "react";
import { Modal, Button, Badge, FormControl, FormGroup, ControlLabel } from "react-bootstrap";

export default class PomaAddTaskModal extends Component {

	constructor(props) {
        super(props);
		this.state = {
            step: 0,
            projects: [],
            usersArray: []
		};
    }

    async componentDidMount() {
        if (!this.props.data) {
            return;
        }
        const { userId, taskId, taskName, taskStatus, taskPomodoroCount, taskDescription, projectId, projectName } = this.props.data;
        this.setState({
            userId,
            taskId,
            taskName,
            taskPomodoroCount,
            taskDescription,
            projectId,
            projectName,
            taskStatus
        });
    }

    componentWillReceiveProps = async () => {
        if (this.props.id) {
            const projects = await this.getUserProjects(this.props.id);
            this.setState({ projects: projects.Items });
        }
        this.setState({ step: 0 });
    }

    getUserProjects = (userId) => {
        return API.get("api", "/api/project", {
            queryStringParameters: {
                userId,
            },
        });
    };

    getUserInfo = (userId) => API.get("api", `/api/user/${userId}`);

    next = () => {
        this.setState((prevState) => {
            return { step: prevState.step + 1 };
        })
    }

    back = () => {
        this.setState((prevState) => {
            return { step: prevState.step - 1 };
        })
    }

    handleChange = (e) => {
        const { target: { id, value } } = e;
        this.setState({ [id]: value });
    }

    handleProjectSelect = (e) => {
        const { projects } = this.state;
        const { target: { value } } = e;
        const index = e.nativeEvent.target.selectedIndex;
        const projectName = e.nativeEvent.target[index].text;
        // get contributors for this project
        const { projectContributors } = _.find(projects, ['projectId', value]) || { projectContributors: { values: [] } };
        const { values } = projectContributors;
        const usersArray = [];
        values.forEach(async (user) => {
            const userInfo = await this.getUserInfo(user);
            usersArray.push(userInfo);
        });
        this.setState({ projectId: value, projectName, usersArray });
    }

    handleAssigneeSelect = (e) => {
        const { target: { value } } = e;
        const index = e.nativeEvent.target.selectedIndex;
        const userName = e.nativeEvent.target[index].text;
        this.setState({ userId: value, userName });
    }

    renderStep1() {
        return (
            <form className="animated fadeIn">
                <FormControl
                    id="taskName"
                    type="text"
                    label="Text"
                    placeholder="Task Name"
                    value={this.state.taskName}
                    onChange={this.handleChange}
                />
                <FormControl
                    id="taskPomodoroCount"
                    type="number"
                    label="Points"
                    placeholder="Poma task points"
                    value={this.state.taskPomodoroCount}
                    onChange={this.handleChange}
                />
                <FormControl
                    id="taskDescription"
                    type="text"
                    label="Text"
                    placeholder="Description"
                    value={this.state.taskDescription}
                    onChange={this.handleChange}
                />
            </form>
        )
    }

    renderStep2() {
        const { projectId: projectIdProp, taskName } = this.state;
        return (
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Project</ControlLabel>
                {!this.props.edit &&
                    <FormControl componentClass="select" placeholder="select" value={projectIdProp} onChange={this.handleProjectSelect}>
                        <option value="select">Select the project this task belongs to</option>
                    {
                        this.state.projects.map((project) => {
                            const { projectId, projectName } = project;
                            return <option value={projectId}>{projectName}</option>
                        })
                    }
                    </FormControl>
                }
                {this.props.edit &&
                    <FormControl componentClass="select" placeholder="select" disabled>
                        <option value="select" >{taskName}</option>
                    </FormControl>
                }
            </FormGroup>
        )
    }

    renderStep3() {
        const { usersArray, userId: userIdProp } = this.state;
        return (
            <FormGroup controlId="userId">
                <ControlLabel>Assignee</ControlLabel>
                    <FormControl componentClass="select" value={userIdProp} placeholder="select" onChange={this.handleAssigneeSelect}>
                        <option value="select" selected="selected">Select who is working on this task</option>
                    {
                        usersArray.map((user) => {
                            const { userId, firstName, lastName } = user;
                            return <option value={userId}>{firstName} {lastName}</option>
                        })
                    }
                    </FormControl>
            </FormGroup>
        )
    }

    renderStep4 = () => {
        const { taskName, userName, taskDescription, taskPomodoroCount, projectName } = this.state;
        return (
            <div>
               <div><strong>Task Name: </strong>{taskName}</div>
               <div><strong>Task Pomodoro Count: </strong>{taskPomodoroCount}</div>
               <div><strong>Task Description: </strong>{taskDescription}</div>
               <div><strong>Assignee: </strong>{userName}</div>
               <div><strong>Project: </strong>{projectName}</div>
            </div>
        )
    }

	render() {
        const steps = [
            {
                title: 'Task Details',
                content: this.renderStep1()
            },
            {
                title: 'Project',
                content: this.renderStep2()
            },
            {
                title: 'Assignee',
                content: this.renderStep3()
            },
            {
                title: 'Review',
                content: this.renderStep4()
            },
        ]
        let stepBadges = [];
        steps.forEach((step, index) => {
            stepBadges.push(<Badge key={index} className={index === this.state.step ? 'active' : ''}>{step.title}</Badge>)
        });

        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-step-badges"> 
                        { stepBadges }
                    </div>    
                    <div className="modal-step-body">{ steps[this.state.step].content }</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="poma-cancel" className="btn-poma-cancel" onClick={() => this.props.handleClose(null, false)}>Close</Button>
                    <Button bsStyle="poma" className="btn-poma transition" onClick={this.back} disabled={this.state.step === 0}>Back</Button>
                    {this.state.step !== steps.length-1 &&
                        <Button bsStyle="poma" className="btn-poma" onClick={this.next} disabled={this.state.step === steps.length-1}>Next</Button>
                    }
                    {this.state.step === steps.length-1 &&
                        <Button bsStyle="poma" className="btn-poma" onClick={() => this.props.handleClose(this.state, true)}>Submit</Button>
                    }
                </Modal.Footer>
            </Modal>
		);
	}
}