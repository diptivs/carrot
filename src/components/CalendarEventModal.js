import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import TimerMachine from 'react-timer-machine'
import { API } from "aws-amplify";
import moment from "moment";

export default class CalendarEventModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            started: false,
        }
    }

    startTimer = () => {
        const { id } = this.props.event;
        // API.put("api", `/api/task/${id}`, {
        //     body: {
        //         taskPomodoroStartTime: moment().format('X');
        //     }
        // });
        this.setState({
            started: true
        });
    }

    timerComplete = () => {
        const { id } = this.props.event;
        // API.put("api", `/api/task/${id}`, {
        //     body: {
        //         taskPomodoroEndTime: moment().format('X');
        //     }
        // });
    };

	render() {
        const { started } = this.state;
        const { title, id, start, end} = this.props.event;
        return (
            <Modal show={this.props.show} onHide={() => this.props.handleClose(null, false)} keyboard={false} dialogClassName="event-modal">
                <Modal.Body>
                    <div><strong className="w-100">{ title }</strong></div>
                    <div className="w-60 pull-left">
                        <div>Description goes here</div>
                        <div>Pomodoro count</div>
                    </div>
                    <div className="timer-container w-40 pull-right v-center">
                        <TimerMachine
                            timeStart={10 * 1000}
                            timeEnd={20 * 1000}
                            started={started}
                            paused={false}
                            countdown={false}
                            interval={1000}
                            onComplete={this.timerComplete}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-poma-cancel" disabled={started} onClick={() => this.props.handleClose(null, false)}>Close</Button>
                    <Button className="btn-poma" disabled={!started} onClick={this.timerComplete}>Done</Button>
                    <Button className="btn-poma" disabled={started}>View</Button>
                    <Button onClick={this.startTimer} disabled={started}>Start</Button>
                </Modal.Footer>
            </Modal>
		);
	}
}