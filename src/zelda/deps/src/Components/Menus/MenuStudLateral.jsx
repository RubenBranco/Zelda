import React from "react";
import Dropdown from 'react-bootstrap/Dropdown'
class MenuStudLateral extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <Dropdown.Menu show className="MenuStudLateral">
                <Dropdown.Header>{gettext("Cadeiras")}</Dropdown.Header>

                <Dropdown.Header>{gettext("Consultar")}</Dropdown.Header>
                <Dropdown.Item eventKey="1">{gettext("Attendances")}</Dropdown.Item>
                <Dropdown.Item eventKey="2">{gettext("Curriculum")}</Dropdown.Item>
                <Dropdown.Item eventKey="3">{gettext("Grades")}</Dropdown.Item>
                <Dropdown.Item eventKey="4">{gettext("Profile")}</Dropdown.Item>
                <Dropdown.Item eventKey="5">{gettext("Schedule")}</Dropdown.Item>
                <Dropdown.Header>{gettext("Management")}</Dropdown.Header>
                <Dropdown.Item eventKey="6">{gettext("Curricular Units")}</Dropdown.Item>
                <Dropdown.Item eventKey="7">{gettext("Shifts")}</Dropdown.Item>
            </Dropdown.Menu>
        );
    }
}

export default MenuStudLateral;
