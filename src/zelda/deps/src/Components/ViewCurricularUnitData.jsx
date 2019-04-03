import React from 'react';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

class ViewCurricularUnitData extends React.Component{
    constructor() {
        super();
        this.state = {
            subjectData: [],
        };
    }

    componentDidMount() {
        // tenho que receber algo por props
        // falta o nome da cadeira
        let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        fetch("/api/subject_spec/2/", {
            method: "GET",
            headers: {
                "X-CSRFToken": csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    subjectData: data,
                })
                console.log(this.state.subjectData);
            })
        });
    }



    render () {
        return (
            <Container>
                <Tab.Container defaultActiveKey="goals">
                    <Row>
                        <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                            <Nav.Link eventKey="goals">{gettext("Goals")}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="program">{gettext("Program")}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="evaluation">{gettext("Evaluation")}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="bibliography">{gettext("Bibliography")}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="details">{gettext("Details")}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="schedule">{gettext("Schedule")}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="teachers">{gettext("Teachers")}</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="attendance">{gettext("Attendance")}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="goals">
                                <h2>{gettext("Goals")}</h2>
                                <hr />
                                <p>{gettext(this.state.subjectData.objectives)}</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="program">
                                <h2>{gettext("Program")}</h2>
                                <hr />
                                <p>{gettext(this.state.subjectData.programme)}</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="evaluation">
                                <h2>{gettext("Evaluation")}</h2>
                                <hr />
                                <p>{gettext(this.state.subjectData.evaluation_method)}</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="bibliography">
                                <h2>{gettext("Bibliography")}</h2>
                                <hr />
                                <p>{gettext(this.state.subjectData.bibliography)}</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="details">
                                <h2>{gettext("Details")}</h2>
                                <hr />
                                <h4>{gettext("ECTS")}</h4>
                                <p>{gettext(this.state.subjectData.ects)}</p>
                                <br />
                                <h4>{gettext("Code")}</h4>
                                <p>{gettext(this.state.subjectData.code)}</p>
                            </Tab.Pane>
                            <Tab.Pane eventKey="schedule">
                                <h2>{gettext("Schedule")}</h2>
                                <hr />
                                
                            </Tab.Pane>
                            <Tab.Pane eventKey="teachers">
                                <h2>{gettext("Teachers")}</h2>
                                <hr />
                                
                            </Tab.Pane>
                            <Tab.Pane eventKey="attendance">
                                <h1>Isto é um link para consultar as presenças dos alunos na respetiva cadeira</h1>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        )
    }
}

export default ViewCurricularUnitData;