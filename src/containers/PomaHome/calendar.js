import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import events from './events';
import CalendarEventModal from '../../components/CalendarEventModal'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEventModal: false,
            event: null,
        }
    }

    toggleEditModal = (event) => {
        this.setState({ showEventModal: true, event });
    }

    handleEventModalHide = () => {
        this.setState({ showEventModal: false });
    }
	render() {
        const { showEventModal, event } = this.state;
		return (
            <div>
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    className="animated fadeIn"
                    onSelectEvent={this.toggleEditModal}
                />
				{
					showEventModal ? <CalendarEventModal show={showEventModal} handleClose={this.handleEventModalHide} event={event}/> : null
				}
             </div>
		);
	}
}