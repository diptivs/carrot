import React, { Component } from "react";
import { Modal, Button, Badge, FormControl } from "react-bootstrap";
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import moment from 'moment';

export default class PomaAddProjectModal extends Component {

	constructor(props) {
        super(props);
		this.state = {
            step: 0,
            projectName: '',
            projectDescription: '',
            contributors: '',
            projectContributors: [],
            startDate: null,
            endDate: null,
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

    handleEnter = (e) => {
        const { target: { id, value }, charCode } = e;
        if (charCode === 13) {
            e.preventDefault();
            this.setState((prevState) => {
                let newContributorsList = prevState.projectContributors;
                newContributorsList.push(value);
                return { projectContributors: newContributorsList, contributors: '' };
            })
        }
    }

    deleteContributor = (index) => {
        this.setState((prevState) => {
            let newContributorsList = prevState.projectContributors;
            newContributorsList.splice(index, 1);
            return { projectContributors: newContributorsList, contributors: '' };
        })
    }

    renderStep1() {
        return (
            <form className="animated fadeIn">
                <FormControl
                    id="projectName"
                    type="text"
                    label="Text"
                    placeholder="Project name"
                    value={this.state.projectName}
                    onChange={this.handleChange}
                />
                <FormControl
                    id="projectDescription"
                    type="text"
                    label="Text"
                    placeholder="Description"
                    value={this.state.projectDescription}
                    onChange={this.handleChange}
                />
            </form>
        )
    }

    renderStep1 = () => {
        return (
            <form className="animated fadeIn">
                <FormControl
                    id="projectName"
                    type="text"
                    label="Text"
                    placeholder="Project name"
                    value={this.state.projectName}
                    onChange={this.handleChange}
                />
                <FormControl
                    id="projectDescription"
                    type="text"
                    label="Text"
                    placeholder="Description"
                    value={this.state.projectDescription}
                    onChange={this.handleChange}
                />
            </form>
        )
    }

    renderStep2 = () => {
        return (
            <div className="text-center animated fadeIn">
                <i className="far fa-clock" />
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </div>
        )
    }

    renderStep3 = () => {
        const { projectContributors } = this.state;
        return (
            <div className="text-center animated fadeIn">
                <form className="animated fadeIn">
                    <FormControl
                        id="contributors"
                        type="text"
                        label="Text"
                        placeholder="Enter an email and press enter"
                        value={this.state.contributors}
                        onChange={this.handleChange}
                        onKeyPress={this.handleEnter}
                    />
                </form>
                <div className="flex-container">
                {
                    projectContributors.map((contributor, index) => {
                        return <Badge className="contributor-label"><i class="far fa-times-circle remove-circle" onClick={() => this.deleteContributor(index)}/>{contributor}</Badge>
                    })
                }
                </div>
            </div>
        )
    }

    renderStep4 = () => {
        const { projectContributors, projectName, projectDescription, startDate, endDate } = this.state;
        return (
            <div>
               <div><strong>Project Name: </strong>{projectName}</div>
               <div><strong>Project Description: </strong>{projectDescription}</div>
               <div><strong>Start date: </strong>{moment(startDate).format('MMM Do YY')}</div>
               <div><strong>End date: </strong>{moment(endDate).format('MMM Do YY')}</div>
               <div className="flex-container">
                    <strong>End date: </strong>
                {
                    projectContributors.map((contributor, index) => {
                        return <Badge className="contributor-label">{contributor}</Badge>
                    })
                }
                </div>
            </div>
        )
    }

	render() {
        const steps = [
            {
                title: 'Project Details',
                content: this.renderStep1(),
            },
            {
                title: 'Timeline',
                content: this.renderStep2(),
            },
            {
                title: 'Contributors',
                content: this.renderStep3(),
            },
            {
                title: 'Review',
                content: this.renderStep4(),
            },
        ]
        let stepBadges = [];
        steps.forEach((step, index) => {
            stepBadges.push(<Badge className={index === this.state.step ? 'active' : ''}>{step.title}</Badge>)
        });

        return (
            <Modal show={this.props.show} onHide={this.props.handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-step-badges"> 
                        { stepBadges }
                    </div>    
                    <div className="modal-step-body">{ steps[this.state.step].content }</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="poma-cancel" className="btn-poma-cancel" onClick={() => this.props.handleClose(this.state, false)}>Close</Button>
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