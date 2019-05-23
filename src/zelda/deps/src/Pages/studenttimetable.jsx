import React from 'react';
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import Schedule from "../Components/Schedules/Schedule.jsx";
import WebCrumbs from "../Components/WebCrumbs.jsx";
import Container from "react-bootstrap/Container";
import ListGroup from 'react-bootstrap/ListGroup';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import getCsrfToken from "../functions/csrf.js";


class StudentTimeTable extends React.Component {
    constructor() {
        super();
        this.state = {
            classes: [],
        };
        this.csrfmiddlewaretoken = getCsrfToken();
    }

    componentDidMount() {
        if (!this.state.classes.length) {
            fetch('/api/timetable_lesson_spec/my_timetable/', {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    this.setState(prevState => ({
                        classes: [...prevState.classes, ...data]
                    }))
                })
            })
        }
    }

    render() {
        const pages = [{ "name": gettext("Home"), "href": window.frontpageUrl }, { "name": gettext("Personal Schedule"), href: "" }];
        return (
            <div>
                <Navigator />
                <WebCrumbs pages={pages} />

                <Container className="schedule">
                    <Tab.Container id="list-group-tabs-example" >
                        <Row>
                            <Col>
                                {!this.state.classes.length ? null :
                                    <Schedule classes={this.state.classes} />

                                }
                            </Col>
                        </ Row>

                    </ Tab.Container>
                </ Container >

            </div>
        );
    }
}

ReactDOM.render(<StudentTimeTable />, document.getElementById("main"));
export default StudentTimeTable;
