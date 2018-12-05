import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import TimerMachine from 'react-timer-machine'
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";
import { TASK_STATUS } from "../constants";

const { DONE, NEW } = TASK_STATUS;
export default class CalendarEventModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
            taskDescription: null,
            taskStatus: null,
            status: null
        }
    }

    async componentDidMount() {
        this.setTaskInfo();
    }

    setTaskInfo = async () => {
        const { taskId } = this.props.event;
        if (!taskId) {
            return;
        }
        const taskInfo = await this.getTaskInfo(taskId);
        const { taskDescription, taskStatus, taskPomodoroEndTime } = taskInfo;
        this.setState({ taskDescription, taskStatus, status: taskPomodoroEndTime ? DONE : NEW });
    }
	getTaskInfo = (taskId) => API.get("api", `/api/task/${taskId}`);

    startTimer = () => {
        const { taskId } = this.props.event;
        API.put("api", `/api/task/${taskId}`, {
            body: {
                taskPomodoroStartTime: moment().format('X')
            }
        });
        this.setState({
            started: true
        });
    }

    timerComplete = () => {
        const { taskId } = this.props.event;
        API.put("api", `/api/task/${taskId}`, {
            body: {
                taskPomodoroEndTime: moment().format('X')
            }
        }).then(() => {
            this.setTaskInfo();
        });
        this.setState({ started: false });
    };

	render() {
        const { started, taskDescription, status } = this.state;
        const { taskId, title, start, end } = this.props.event;
        const taskIsDone = status === DONE
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose(null, false)} keyboard={false} dialogClassName={ taskIsDone ? "event-modal-done" : "event-modal"}>
                <Modal.Body>
                    <div><strong className="w-100">{ title }</strong></div>
                    <div className="w-60 pull-left">
                        <div>{taskDescription}</div>
                    </div>
                    <div className="timer-container w-40 pull-right v-center">
                        <TimerMachine
                            started={started}
                            countdown={true}
                            onComplete={this.timerComplete}
                            timeStart={(end.getTime() - start.getTime())}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-poma-cancel" disabled={started} onClick={() => this.props.handleClose(null, false)}>Close</Button>
                    <Button className="btn-poma" disabled={!started} onClick={this.timerComplete}>Done</Button>
                    <LinkContainer to={`/tasks/${taskId}`}>
                        <Button className="btn-poma" disabled={started || !taskId}>View</Button>
                    </LinkContainer>
                    <Button onClick={this.startTimer} disabled={started || taskIsDone}>Start</Button>
                </Modal.Footer>
            </Modal>
		);
	}
}