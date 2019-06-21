import React from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import ListGroup from "react-bootstrap/ListGroup";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faClock, faExchangeAlt, faDoorClosed, faUserPlus, faShippingFast } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';

import getCsrfToken from "../functions/csrf.js";


class SubjectShiftManagement extends React.Component{
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

    componentDidMount () {
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

    checkAvailability (shift) {
        return shift.enrolled_students < shift.vacancies;
    }

    handleEnrollShift(shift , e) {
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

    render () {
        return (
            <div>
<<<<<<< HEAD
            <MenuStudLateral />
            <div className="resto-pagina2">
            <h2 className="title_main_menu">{gettext("Subject Shifts")}</h2>
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
                                    <Col lg="3" md="3" sm="3" xl="3" xs="3">
                                    </Col>
                                    <Col>
                                    <ListGroup variant="flush">
                                        {shift.lesson_spec.map(lesson_spec =>
                                            <ListGroup.Item>
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
=======
                <MenuStudLateral />
                <Container>
                    <h3 className="titulosCentrados">{gettext("Shift Management")} - Nome da Cadeira</h3>
                    <Row>
                        <Col sm="4">
                            <Card bg="light">
                                <Card.Header>{gettext("Enrolled In")}</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <ListGroup variant="flush">
                                            {this.state.shifts.map(shift =>
                                                shift.enrolled ?
                                                <ListGroup.Item variant="success">
                                                    {shift.code} <FontAwesomeIcon icon={faUserCheck} />
                                                    <Row>
                                                        <Col>
                                                        <ListGroup variant="flush">
                                                            {shift.lesson_spec.map(lesson_spec =>
                                                                <ListGroup.Item variant="success">
                                                                    <FontAwesomeIcon icon={faClock} /> {lesson_spec.weekday} |
                                                                    {moment(lesson_spec.time, "HH:mm:ss").format("HH:mm")} - {moment(lesson_spec.time, "HH:mm:ss").add(moment.duration(lesson_spec.duration, "minutes")).format("HH:mm")}
                                                                </ListGroup.Item>
                                                            )}
                                                        </ListGroup>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                : null
                                            )}
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                         </Col>
                         <Col sm="4">
                            <Card bg="light">
                                <Card.Header>{gettext("Enroll In")}</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <ListGroup variant="flush">
                                            {this.state.shifts.map(shift =>
                                                shift.enrolled == false ? this.canEnroll(shift) ? this.checkAvailability(shift) ? shift.under_exchange_review == false ?
                                                    <ListGroup.Item variant="primary">
                                                    {shift.code} <Button variant="outline-dark" data-shift-id={shift.id} onClick={this.handleEnrollShift.bind(this, shift)}><FontAwesomeIcon icon={faUserPlus} /></Button>
                                                    <Row>
                                                        <Col>
                                                        <ListGroup variant="flush">
                                                            {shift.lesson_spec.map(lesson_spec =>
                                                                <ListGroup.Item variant="primary">
                                                                    <FontAwesomeIcon icon={faClock} /> {lesson_spec.weekday} |
                                                                    {moment(lesson_spec.time, "HH:mm:ss").format("HH:mm")} - {moment(lesson_spec.time, "HH:mm:ss").add(moment.duration(lesson_spec.duration, "minutes")).format("HH:mm")}
                                                                </ListGroup.Item>
                                                            )}
                                                        </ListGroup>
                                                        </Col>
                                                    </Row>
                                                    </ListGroup.Item>
                                                    :null:null:null:null
                                           )}
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                         </Col>
                         <Col sm="4">
                            <Card>
                                <Card.Header>{gettext("Changing Shifts")}</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <ListGroup>
                                            {this.state.shifts.map(shift =>
                                                shift.enrolled ?
                                                    this.state.shifts.map(toshift =>
                                                        toshift.enrolled == false ? this.canEnroll(shift) == false ? this.checkAvailability(toshift) ? toshift.under_exchange_review == false ? toshift.lesson_spec[0].c_type == shift.lesson_spec[0].c_type ? toshift.code != shift.code ?
                                                        <ListGroup.Item variant="primary">
                                                            {shift.code}
                                                            <Button variant="outline-dark" onClick={this.handleExchangeShift.bind(this, toshift)}><FontAwesomeIcon icon={faExchangeAlt} /></Button>
                                                            {toshift.code}
                                                            <Row>
                                                                <Col>
                                                                <ListGroup variant="flush">
                                                                    {toshift.lesson_spec.map(lesson_spec =>
                                                                        <ListGroup.Item variant="primary">
                                                                            <FontAwesomeIcon icon={faClock} /> {lesson_spec.weekday} |
                                                                            {moment(lesson_spec.time, "HH:mm:ss").format("HH:mm")} - {moment(lesson_spec.time, "HH:mm:ss").add(moment.duration(lesson_spec.duration, "minutes")).format("HH:mm")}
                                                                        </ListGroup.Item>
                                                                    )}
                                                                </ListGroup>
                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>:null:null:null:null:null:null
                                                    )
                                                    :null
                                            )}
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Header>{gettext("Change Shift Orders")}</Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <ListGroup>
                                            {this.state.shifts.map(shift =>
                                                shift.enrolled ?
                                                    this.state.shifts.map(toshift =>
                                                        toshift.enrolled == false ? this.canEnroll(shift) == false ? this.checkAvailability(toshift) ? toshift.under_exchange_review ? toshift.lesson_spec[0].c_type == shift.lesson_spec[0].c_type ? toshift.code != shift.code ?
                                                        <ListGroup.Item variant="warning">
                                                            {shift.code}
                                                            <Button variant="outline-dark" data-shift-id={shift.id} onClick={this.handleExchangeShift.bind(this, toshift)}><FontAwesomeIcon icon={faExchangeAlt} /></Button>
                                                            {toshift.code}
                                                            <Row>
                                                                <Col>
                                                                <ListGroup variant="flush">
                                                                    {toshift.lesson_spec.map(lesson_spec =>
                                                                        <ListGroup.Item variant="warning">
                                                                            <FontAwesomeIcon icon={faClock} /> {lesson_spec.weekday} |
                                                                            {moment(lesson_spec.time, "HH:mm:ss").format("HH:mm")} - {moment(lesson_spec.time, "HH:mm:ss").add(moment.duration(lesson_spec.duration, "minutes")).format("HH:mm")}
                                                                        </ListGroup.Item>
                                                                    )}
                                                                </ListGroup>
                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>:null:null:null:null:null:null
                                                    )
                                                    :null
                                            )}
                                        </ListGroup>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                         </Col>
                    </Row>
                </Container>
>>>>>>> 1a7d3be9679e4dfd3f8df93eac186325828d98eb
            </div>
        );
    }
}

export default SubjectShiftManagement;
