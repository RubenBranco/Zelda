import React from "react";
import Image from "react-bootstrap/Image";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
class MenuProfLateral extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <div class="menu-prof">
            <Dropdown.Menu show className="MenuProfLateral">
                <Dropdown.Header>{gettext("Subjects")}</Dropdown.Header>

                <Dropdown.Header>{gettext("Consult")}</Dropdown.Header>
                <Dropdown.Item eventKey="4">{gettext("Attendances")}</Dropdown.Item>
                <Dropdown.Item eventKey="5">{gettext("Profile")}</Dropdown.Item>
                <Dropdown.Header>{gettext("Requests")}</Dropdown.Header>
                <Dropdown.Item eventKey="6">{gettext("Shift Exchange Requests")}</Dropdown.Item>
            </Dropdown.Menu>
            </div>
        );
    }


}

export default MenuProfLateral;
