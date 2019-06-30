import React from "react";
import Dropdown from 'react-bootstrap/Dropdown'

class MenuStudLateral extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <Dropdown.Menu show className="MenuStudLateral">
                <Dropdown.Header>{gettext("Consult")}</Dropdown.Header>
                <Dropdown.Item eventKey="1" href={window.viewAttendancesUrl}>{gettext("Attendances")}</Dropdown.Item>
                <Dropdown.Item eventKey="2" href={window.viewCurriculumUrl}>{gettext("Curriculum")}</Dropdown.Item>
                <Dropdown.Item eventKey="3" href={window.viewGradesUrl}>{gettext("Grades")}</Dropdown.Item>
                <Dropdown.Item eventKey="4" href={window.viewProfileUrl}>{gettext("Profile")}</Dropdown.Item>
                <Dropdown.Item eventKey="5" href={window.viewTimetableUrl}>{gettext("Schedule")}</Dropdown.Item>
                <Dropdown.Header>{gettext("Management")}</Dropdown.Header>
                <Dropdown.Item eventKey="6" href={window.viewSubjectSignupUrl}>{gettext("Enroll/Unsubscribe in Curricular Units")}</Dropdown.Item>
                <Dropdown.Item eventKey="7" href={window.viewShiftManagementUrl}>{gettext("Enroll / Unsubscribe in Shifts")}</Dropdown.Item>
            </Dropdown.Menu>
        );
    }
}

export default MenuStudLateral;
