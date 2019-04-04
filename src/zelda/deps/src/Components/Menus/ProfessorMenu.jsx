import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProfileSearch from "../Searches/SearchProfile.jsx";
import CoursesList from "../MenuLists/CoursesList.jsx";


class ProfessorMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userid: null,
            courses: [],
        };
    }

    render() {
        return (
            <div>
                <CoursesList courses={this.state.courses} />
                <CardDeck>
                    <Card>
                        <Card.Header className="text-center font-weight-bold">
                        {gettext("Consult")}
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item action>
                                    {gettext("Attendance")}
                                </ListGroup.Item>
                                <ListGroup.Item action>{gettext("Profile")}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                    <Card>
                        <Card.Header className="text-center font-weight-bold">
                        {gettext("Requests")}
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item action>
                                    {gettext("Room Change")}
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    {gettext("Room Reservation")}
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    {gettext("Enroll / Unsubscribe in Curricular Units")}
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    {gettext("Enroll / Unsubscribe in Shifts")}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                        <Card.Footer />
                    </Card>
                </CardDeck>
                <ProfileSearch />
            </div>
        );
    }
}

export default ProfessorMenu;
