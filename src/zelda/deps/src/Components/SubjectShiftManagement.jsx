import React from 'react';
import Row from 'react-bootstrap/Row';
import WebCrumbs from "../Components/WebCrumbs.jsx";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import ListGroup from "react-bootstrap/ListGroup";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faClock, faExchangeAlt, faDoorClosed, faUserPlus, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

import getCsrfToken from "../functions/csrf.js";


class SubjectShiftManagement extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            shifts: [],
            subjectSpec: {},
        };
        this.cTypeMapping = {
            theory: 'T',
            practice: 'TP',
            lab: 'PL',
            field: 'F',
        };

        this.csrfmiddlewaretoken = getCsrfToken();
        this.checkAvailability = this.checkAvailability.bind(this);
        this.canEnroll = this.canEnroll.bind(this);
        this.toastSettings = {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        };
    }

    componentDidMount() {
        if (!this.state.shifts.length) {
            fetch(`/api/subject/${this.props.subjectId}/shift_report`, {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                }
            }).then(response => {
                response.json().then(data => {
                    this.setState({
                        shifts: data.shifts,
                        subjectSpec: data.subject_spec,
                    })
                });
            });
        }
    }

    canEnroll(shift) {
        return !this.state.shifts.filter(_shift => shift.lesson_spec[0].c_type === _shift.lesson_spec[0].c_type && _shift.enrolled).length;
    }

    checkAvailability(shift) {
        return shift.enrolled_students < shift.vacancies;
    }

    handleEnrollShift(shift, e) {
        fetch(`/api/shift/${shift.id}/sign_up`, {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            if (response.status === 200) {
                toast.success(gettext(
                    `Successfully enrolled in ${shift.code}`
                ), this.toastSettings);
                let newShiftList = [];
                this.state.shifts.map(_shift => {
                    if (_shift.id === shift.id) {
                        _shift.enrolled = true;
                    }
                    newShiftList.push(_shift);
                });
                this.setState({
                    shifts: newShiftList
                });
            } else if (response.status === 403) {
                toast.error(gettext(
                    "Something went wrong with your request. Try again later."
                ), this.toastSettings);
            }
        });
    }

    handleExchangeShift(shift, e) {
        fetch(`/api/shift/${shift.id}/request_exchange`, {
            method: 'GET',
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            },
        }).then(response => {
            if (response.status === 200) {
                toast.success(gettext(
                    `Successfully requested enrollment in ${shift.code}`
                ), this.toastSettings);
                let newShiftList = [];
                this.state.shifts.map(_shift => {
                    if (_shift.id === shift.id) {
                        _shift.under_exchange_review = true;
                    }
                    newShiftList.push(_shift);
                });
                this.setState({
                    shifts: newShiftList
                });
            } else if (response.status === 403) {
                toast.error(gettext(
                    "Something went wrong with your request. Try again later."
                ), this.toastSettings);
            }
        });
    }

    render() {
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Subject Shifts"), href: "" }];
        return (
            <div>
                <MenuStudLateral />
                <div className="resto-pagina2">
                    <h2 className="title_main_menu">{gettext("Subject Shifts")}</h2>

                    <WebCrumbs pages={pages} />
                    <hr />
                    <Row>
                        <Col lg="3" md="3" sm="3" xl="3" xs="3">
                            <ListGroup variant="flush">
                                {this.state.shifts.map(shift =>
                                    <ListGroup.Item>
                                        {shift.code} {shift.enrolled ? <FontAwesomeIcon icon={faUserCheck} /> : this.canEnroll(shift) ?
                                            <Button variant="outline-dark" data-shift-id={shift.id} onClick={this.handleEnrollShift.bind(this, shift)}><FontAwesomeIcon icon={faUserPlus} /></Button>
                                            :
                                            this.checkAvailability(shift) ?
                                                shift.under_exchange_review ?
                                                    <FontAwesomeIcon icon={faShippingFast} />
                                                    :
                                                    <Button variant="outline-dark" data-shift-id={shift.id} onClick={this.handleExchangeShift.bind(this, shift)}><FontAwesomeIcon icon={faExchangeAlt} /></Button> :
                                                <FontAwesomeIcon icon={faDoorClosed} />
                                        }
                                        <Row>
                                            <Col lg="3" md="3" sm="3" xl="3" xs="3" >
                                            </Col>
                                            <Col>
                                                <ListGroup variant="flush">
                                                    {shift.lesson_spec.map(lesson_spec =>
                                                        <ListGroup.Item id="turnos">
                                                            <FontAwesomeIcon icon={faClock} /> {lesson_spec.weekday} |
                                                {moment(lesson_spec.time, "HH:mm:ss").format("HH:mm")} - {moment(lesson_spec.time, "HH:mm:ss").add(moment.duration(lesson_spec.duration, "minutes")).format("HH:mm")}
                                                        </ListGroup.Item>
                                                    )}
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Col>
                        <Col>

                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default SubjectShiftManagement;
