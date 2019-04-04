import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


class Navigator extends React.Component {
  render() {
    return (
      <Navbar id="navbar">
        <Nav className="mr-auto">
          <Navbar.Brand href={window.frontpageUrl}>
            <Image
              alt=""
              src={window.fculLogoBranco}
              width="30"
              height="30"
              className="d-inline-block align-top navLogoImages"
            />
          </Navbar.Brand>
        </Nav>
        <Nav>
          <Image
            alt=""
            src={window.userImageUrl}
            width="30"
            height="30"
            className="d-inline-block align-top navImage"
          />

          <Navbar.Text className="nomedoUser">{window.firstName} {window.lastName}</Navbar.Text>
        </Nav>

        <Nav className="ml-auto">
          <Nav.Link
            className="navlinks"
            href={window.webmailUrl}
            target="_blank"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </Nav.Link>
          <Nav.Link className="navlinks" href={window.logoutUrl}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Navigator;
