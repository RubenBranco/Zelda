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
                <Dropdown.Header>{gettext("Cadeiras")}</Dropdown.Header>
                <Dropdown.Item eventKey="1">Another action!</Dropdown.Item>
                <Dropdown.Item eventKey="2">Something else</Dropdown.Item>
                <Dropdown.Header>Consultar</Dropdown.Header>
                <Dropdown.Item eventKey="4">{gettext("Presenças")}</Dropdown.Item>
                <Dropdown.Item eventKey="5">{gettext("Perfil")}</Dropdown.Item>
                <Dropdown.Header>Requests</Dropdown.Header>
                <Dropdown.Item eventKey="6">{gettext("Room Change")}</Dropdown.Item>
                <Dropdown.Item eventKey="7">{gettext("Room Reservation")}</Dropdown.Item>
            </Dropdown.Menu>
            </div>
        );
    }


}

export default MenuProfLateral;
