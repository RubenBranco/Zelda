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
            <Dropdown.Menu show className="MenuProfLateral">
                <Dropdown.Header>Cadeiras</Dropdown.Header>
                <Dropdown.Item eventKey="1">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Something else here</Dropdown.Item>
                <Dropdown.Header>Consultar</Dropdown.Header>
                <Dropdown.Item eventKey="4">Presenças</Dropdown.Item>
                <Dropdown.Item eventKey="5">Perfil</Dropdown.Item>
                <Dropdown.Header>Requests</Dropdown.Header>
                <Dropdown.Item eventKey="6">Room Change</Dropdown.Item>
                <Dropdown.Item eventKey="7">Room Reservation</Dropdown.Item>
            </Dropdown.Menu>
        );
    }
}

export default MenuProfLateral;
