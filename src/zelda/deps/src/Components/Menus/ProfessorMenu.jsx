import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import GetProfessorSubjects from "../GetProfessorSubjects.jsx";

class ProfessorMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div>
                <CardDeck>
                    <Card id="card_prof">
                        <GetProfessorSubjects className="text-center font-weight-bold" />
                    </Card>

                    <Card>
                        <Card.Header className="text-center font-weight-bold ">
                            {gettext("Consult")}
                        </Card.Header>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item action href={window.viewShiftStatusUrl}>
                                    <a >{gettext("Shift Statuses")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action href={window.viewAttendancesUrl}>
                                    <a >{gettext("Attendance")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action href={window.viewShiftlessStudentsUrl}>
                                    <a>{gettext("Shiftless Students")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action href={window.viewProfileUrl}><a >{gettext("Profile")}</a></ListGroup.Item>
                                <ListGroup.Item action href={window.viewGradesUrl}>
                                    <a >{gettext("View Grades")}</a>
                                </ListGroup.Item>
                                <ListGroup.Item action href={window.uploadGradesUrl}><a>{gettext("Upload Grades")}</a></ListGroup.Item>
                                <ListGroup.Item action href={window.viewShiftRequestsUrl}>
                                    <a >{gettext("Shift Exchange Requests")}</a>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>

                </CardDeck>
            </div>
        );
    }
}

export default ProfessorMenu;
