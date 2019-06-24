import React from 'react';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import getCsrfToken from "../functions/csrf.js";


class ViewCurricularUnitData extends React.Component {
    constructor() {
        super();
        this.state = {
            subjectSpecId: null,
            designation: null,
            objectives: null,
            programme: null,
            evaluation: null,
            bibliography: null,
            designation: null,
            ects: null,
            code: null,
            schedule: [],
            professors: [],
        };
        this.csrfmiddlewaretoken = getCsrfToken();
        let pathName = window.location.pathname.split("/");
        this.subjectId = pathName[pathName.length - 2];
        this.hasFetched = false;
    }

    componentDidMount() {
        if (!this.hasFetched) {
            fetch(`/api/subject/${this.subjectId}/`, {
                method: "GET",
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                }
            }).then(response => {
                response.json().then(data => {
                    this.setState({
                        subjectSpecId: data.subject_spec,
                        designation: data.designations,
                    });
                    this.fetchSubjectInfo();
                    this.getProfessors();
                });
            });
            this.hasFetched = true;
        }
    }

    fetchSubjectInfo() {
        fetch(`/api/subject_spec/${this.state.subjectSpecId}/`, {
            method: "GET",
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            }
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    ects: data.ects,
                    code: data.code,
                    programme: data.programme,
                    objectives: data.objectives,
                    evaluation: data.evaluation_method,
                    bibliography: data.bibliography
                });
            });
        });
    }

    getProfessors() {
        fetch(`/api/subject/${this.subjectId}/professors/`, {
            method: "GET",
            headers: {
                "X-CSRFToken": this.csrfmiddlewaretoken,
            }
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    professors: data
                });
            });
        });
    }

    render() {
        return (
            <div>
                <h2 id="titnomecadeira"> {this.state.designation} </h2>
                <Container id="sub-menu-cadeira">
                    <Tab.Container defaultActiveKey="objectives">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link id="item-menu2" eventKey="objectives">{gettext("Objectives")}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link id="item-menu2" eventKey="program">{gettext("Program")}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link id="item-menu2" eventKey="evaluation">{gettext("Evaluation")}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link id="item-menu2" eventKey="bibliography">{gettext("Bibliography")}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link id="item-menu2" eventKey="details">{gettext("Details")}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link id="item-menu2" eventKey="schedule">{gettext("Schedule")}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link id="item-menu2" eventKey="teachers">{gettext("Teachers")}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link
                                            eventKey="attendance"
                                            href={window.viewAttendancesUrl}
                                            target="_blank"
                                        >{gettext("Attendance")}</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="objectives">
                                        <h2 id="tit_sub_menu">{gettext("Objectives")}</h2>
                                        <hr />
                                        {this.state.objectives !== null ?
                                            <p>{this.state.objectives}</p> : null}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="program">
                                        <h2 id="tit_sub_menu">{gettext("Program")}</h2>
                                        <hr />
                                        {this.state.programme !== null ?
                                            <p>{this.state.programme}</p> : null}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="evaluation">
                                        <h2 id="tit_sub_menu">{gettext("Evaluation")}</h2>
                                        <hr />
                                        {this.state.evaluation !== null ?
                                            <p>{this.state.evaluation}</p> : null}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="bibliography">
                                        <h2 id="tit_sub_menu">{gettext("Bibliography")}</h2>
                                        <hr />
                                        {this.state.bibliography !== null ?
                                            <p>{this.state.bibliography}</p> : null}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="details">
                                        <h2 id="tit_sub_menu">{gettext("Details")}</h2>
                                        <hr />
                                        <h4 id="tit_sub_menu_sub">{gettext("ECTS")}</h4>
                                        {this.state.ects !== null ?
                                            <p>{this.state.ects}</p> : null}
                                        <br />
                                        <h4 id="tit_sub_menu_sub">{gettext("Code")}</h4>
                                        {this.state.code !== null ?
                                            <p>{this.state.code}</p> : null}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="schedule">
                                        <h2 id="tit_sub_menu">{gettext("Schedule")}</h2>
                                        <hr />

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="teachers">
                                        <h2 id="tit_sub_menu">{gettext("Teachers")}</h2>
                                        <hr />
                                        {this.state.professors.map(professor =>
                                            <p>{professor.app_user.first_name} {professor.app_user.last_name}</p>
                                        )}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </div>
        )
    }
}

export default ViewCurricularUnitData;
