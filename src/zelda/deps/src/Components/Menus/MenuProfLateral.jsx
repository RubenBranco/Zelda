import React from "react";
import Dropdown from 'react-bootstrap/Dropdown'

class MenuProfLateral extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div className="menu-prof">
            <Dropdown.Menu show className="MenuProfLateral">
                <Dropdown.Header>{gettext("Consult")}</Dropdown.Header>
                <Dropdown.Item eventKey="1" href={window.viewAttendancesUrl}>{gettext("Attendances")}</Dropdown.Item>
                <Dropdown.Item eventkey="2" href={window.viewShiftlessStudentsUrl}>{gettext("Shiftless Students")}</Dropdown.Item>
                <Dropdown.Item eventKey="3" href={window.viewProfileUrl}>{gettext("Profile")}</Dropdown.Item>
                <Dropdown.Header>{gettext("Requests")}</Dropdown.Header>
                <Dropdown.Item eventKey="4" href={window.viewShiftRequestsUrl}>{gettext("Shift Exchange Requests")}</Dropdown.Item>
            </Dropdown.Menu>
            </div>
        );
    }


}

export default MenuProfLateral;
