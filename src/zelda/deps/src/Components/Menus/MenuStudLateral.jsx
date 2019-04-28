import React from "react";
import Image from "react-bootstrap/Image";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
class MenuStudLateral extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <Dropdown.Menu show className="MenuStudLateral">
                <Dropdown.Header>{gettext("Cadeiras")}</Dropdown.Header>
                <Dropdown.Item eventKey="1">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Something else here</Dropdown.Item>
                <Dropdown.Header>{gettext("Consultar")}</Dropdown.Header>
                <Dropdown.Item eventKey="4">{gettext("Presenças")}</Dropdown.Item>
                <Dropdown.Item eventKey="5">{gettext("Currículo")}</Dropdown.Item>
                <Dropdown.Item eventKey="6">{gettext("Notas")}</Dropdown.Item>
                <Dropdown.Item eventKey="7">{gettext("Perfil")}</Dropdown.Item>
                <Dropdown.Header>{gettext("Horário")}</Dropdown.Header>
                <Dropdown.Item eventKey="8">{gettext("Pessoal")}</Dropdown.Item>
                <Dropdown.Item eventKey="9">{gettext("Por Cadeira")}</Dropdown.Item>
                <Dropdown.Item eventKey="10">{gettext("Enroll / Unsubscribe in Curricular Units")}</Dropdown.Item>
                <Dropdown.Item eventKey="11">{gettext("Enroll / Unsubscribe in Shifts")}</Dropdown.Item>
            </Dropdown.Menu>
        );
    }
}

export default MenuStudLateral;
