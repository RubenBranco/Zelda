import React from "react";
import CardDeck from "react-bootstrap/CardDeck";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";

class MainMenu extends React.Component {
  render() {
    return (
      <div>
        <div id="img">
          <Image src="../static/img/background.png" id="img_background_all" />
        </div>
        <div id="mainMenu">
          <CardDeck>
            <Card>
              <Card.Header className="text-center cardheader font-weight-bold">
                {gettext("Subjects")}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item action>{gettext("Courses")}</ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
              <Card.Footer />
            </Card>
            <Card>
              <Card.Header className="text-center font-weight-bold">
                {gettext("Consult")}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item action>
                      {gettext("Attendance")}
                    </ListGroup.Item>
                    <ListGroup.Item action>
                      {gettext("Curriculum")}
                    </ListGroup.Item>
                    <ListGroup.Item action>{gettext("Profile")}</ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
              <Card.Footer />
            </Card>
            <Card>
              <Card.Header className="text-center font-weight-bold">
                {gettext("Schedule")}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item action>
                      {gettext("Personal")}
                    </ListGroup.Item>
                    <ListGroup.Item action>
                      {gettext("By Subjects")}
                    </ListGroup.Item>
                    <ListGroup.Item action>
                      {gettext("Enroll / Unsubscribe in Curricular Units")}
                    </ListGroup.Item>
                    <ListGroup.Item action>
                      {gettext("Enroll / Unsubscribe in Shifts")}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
              </Card.Body>
              <Card.Footer />
            </Card>
          </CardDeck>

          <div id="searchProfile">
            <InputGroup className="mb-3">
              <FormControl
                placeholder={gettext("Search Profile")}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" className="searchButton">
                  {" "}
                  <i class="fas fa-search" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
      </div>
    );
  }
}

export default MainMenu;
