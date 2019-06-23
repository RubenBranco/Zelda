import React from "react";
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import momentPlugin from '@fullcalendar/moment';
import isEqual from 'lodash.isequal';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fortawesome/fontawesome-free/js/all';


class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.handleDatesRender = this.handleDatesRender.bind(this);
        this.handleEventRender = this.handleEventRender.bind(this);

        this.deltas = {
            'monday': moment.duration('0', 'days'),
            'tuesday': moment.duration('1', 'days'),
            'wednesday': moment.duration('2', 'days'),
            'thursday': moment.duration('3', 'days'),
            'friday': moment.duration('4', 'days'),
            'saturday': moment.duration('5', 'days'),
            'sunday': moment.duration('6', 'days'),
        };

        this.cTypeMapping = {
            theory: 'T',
            practice: 'TP',
            lab: 'PL',
            field: 'F',
        };
        if (this.props.classes.length) {
            this.firstSemesterBeginDate = moment(this.props.classes[0].dates.first_semester_begin_date);
            this.firstSemesterEndDate = moment(this.props.classes[0].dates.first_semester_end_date);
            this.secondSemesterBeginDate = moment(this.props.classes[0].dates.second_semester_begin_date);
            this.secondSemesterEndDate = moment(this.props.classes[0].dates.second_semester_end_date);
        }

        this.state = {
            events: [],
        };
    }

    handleDatesRender(event) {
        let activeStart = moment(event.view.activeStart);
        let events = [];
        this.props.classes.map(_class => {
            let classDay = activeStart.add(this.deltas[_class.weekday]);
            let classStart = classDay.add(moment.duration(_class.time));
            let classDuration = moment.duration(_class.duration, 'minutes');
            let classEnd = classStart.add(classDuration);
            if (classDay.isBetween(this.firstSemesterBeginDate._i, this.firstSemesterEndDate._i) && _class.semester === "1" || classDay.isBetween(this.secondSemesterBeginDate._i, this.secondSemesterEndDate._i) && _class.semester === "2") {
                events.push({
                    id: _class.id,
                    title: _class.subject_designation,
                    start: classStart.toISOString(),
                    end: classEnd.toISOString(),
                    url: window.subjectUrl.replace("0", _class.subject_id.toString()),
                    extendedProps: {
                        cType: _class.c_type,
                        room: _class.room,
                    },
                });
            }
        });
        if (!isEqual(this.state.events, events)) {
            this.setState({
                events: events
            });
        }
    }

    handleEventRender(evt) {
        let event = evt.event;
        let element = evt.el;
        let title = element.querySelectorAll('.fc-title')[0];
        let designation = title.textContent;
        title.innerHTML = `<div>${designation} (${this.cTypeMapping[event.extendedProps.cType]})</div><div><span><i class="fas fa-chair"></i> ${event.extendedProps.room}</span></div>`;
    }

    render() {
        return (
            <div>
                <FullCalendar
                    defaultView="timeGridWeek"
                    plugins={[timeGridPlugin, momentPlugin]}
                    weekends={true}
                    events={this.state.events}
                    validRange={{
                        start: this.props.classes.length ? this.props.classes[0].dates.first_semester_begin_date : null,
                        end: this.props.classes.length ? this.props.classes[0].dates.second_semester_end_date : null
                    }}
                    datesRender={this.handleDatesRender}
                    eventRender={this.handleEventRender}
                    nowIndicator={true}
                    displayEventTime={false}
                    minTime="8:00"
                    aspectRatio="35"
                    windowResize =" function(view) {
                        alert('The calendar has adjusted to a window resize');
                      }"



                />

            </div>
        )
    }
}

export default Schedule;
