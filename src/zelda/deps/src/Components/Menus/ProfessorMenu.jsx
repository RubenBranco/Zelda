import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ProfileSearch from "../Searches/SearchProfile.jsx";
import GetProfessorSubjects from "../GetProfessorSubjects.jsx";

class ProfessorMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <GetProfessorSubjects display="card" />
                <CardDeck>
                    <Card>
                        <Card.Header className="text-center font-weight-bold">
                        {gettext("Consult")}
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item action>
                                    <a href="#">{gettext("Attendance")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action><a href="#">{gettext("Profile")}</a></ListGroup.Item>
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
                                    <a href="#">{gettext("Room Change")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action>
                                    <a href="#">{gettext("Room Reservation")}</a>
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
