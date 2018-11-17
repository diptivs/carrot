import React, { Component } from "react";
import { Modal, Button, Badge, FormControl } from "react-bootstrap";

export default class PomaAddTaskModal extends Component {

	constructor(props) {
        super(props);
		this.state = {
			step: 0,
		};
    }

    componentWillReceiveProps() {
        this.setState({ step: 0 });
    }

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
	render() {
        const steps = [
            {
                title: 'Task Details',
                content: this.renderStep1()
            },
            {
                title: 'Project',
                content: <div>Well, heres step 2!</div>
            },
            {
                title: 'Review',
                content: <div>Almost done! Step 3!</div>
            },
        ]
        let stepBadges = [];
        steps.forEach((step, index) => {
            stepBadges.push(<Badge className={index === this.state.step ? 'active' : ''}>{step.title}</Badge>)
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
                    <Button bsStyle="poma-cancel" className="btn-poma-cancel" onClick={this.props.handleClose}>Close</Button>
                    <Button bsStyle="poma" className="btn-poma transition" onClick={this.back} disabled={this.state.step === 0}>Back</Button>
                    {this.state.step !== steps.length-1 &&
                        <Button bsStyle="poma" className="btn-poma" onClick={this.next} disabled={this.state.step === steps.length-1}>Next</Button>
                    }
                    {this.state.step === steps.length-1 &&
                        <Button bsStyle="poma" className="btn-poma" onClick={this.props.handleClose}>Submit</Button>
                    }
                </Modal.Footer>
            </Modal>
		);
	}
}