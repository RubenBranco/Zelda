import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import getCsrfToken from "../../functions/csrf.js";


class ShiftDashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subjects: {},
            courseYearMapping: {},
        };
        this.csrfmiddlewaretoken = getCsrfToken();
    }

    componentDidMount() {
        if (!Object.keys(this.state.subjects).length) {
            fetch('/api/course_subject/my_subjects/', {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    let subjects = {};
                    let courseYearMapping = {};
                    data.map(courseSubject => {
                        let courseYear = courseSubject.course_year;
                        if (!courseYearMapping.hasOwnProperty(courseYear)) {
                            courseYearMapping[courseYear] = [];
                        }
                        subjects[courseSubject.id] = {
                            designation: courseSubject.designation,
                            courseYear: courseYear,
                            subjectId: courseSubject.subject,
                        };
                        courseYearMapping[courseYear].push(courseSubject.id);
                    });
                    this.setState({
                        subjects: subjects,
                        courseYearMapping: courseYearMapping
                    })
                });
            });
        }
    }

    render() {
        let courseYearKeys = Object.keys(this.state.courseYearMapping).sort();
        return (
            <div>
                {!courseYearKeys.length ?
                    null :
                    <CardDeck>
                        {courseYearKeys.map(courseYear =>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {gettext("Year") + ` ${courseYear}`}
                                    </Card.Title>
                                    <ListGroup>
                                        {this.state.courseYearMapping[courseYear].map(courseSubjectId =>
                                            <ListGroup.Item action>
                                                {this.state.subjects[courseSubjectId].designation}
                                                <Button variant="outline-primary" href={subjectShiftManagementUrl.replace("0", this.state.subjects[courseSubjectId].subjectId)}>
                                                    <FontAwesomeIcon icon={faEdit}/>
                                                </Button>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        )
                        }
                    </CardDeck>
                }
            </div>
        );
    }
}

export default ShiftDashboard;
