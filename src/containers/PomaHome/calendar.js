import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default class Calendar extends Component {
	render() {
		return (
            <div>
                <BigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    className="animated fadeIn"
                />
             </div>
		);
	}
}