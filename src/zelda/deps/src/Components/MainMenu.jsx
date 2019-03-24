import React from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

class MainMenu extends React.Component{
    render (){
        return (
            <div id="mainMenu">
                <CardDeck>
                    <Card>
                        <Card.Body>
                        <Card.Title>{gettext("Subjects")}</Card.Title>
                        <Card.Text>
                            <Button variant="secondary" size="sm" block>{gettext("Courses")}</Button>
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer/>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Card.Title>{gettext("Consult")}</Card.Title>
                        <Card.Text>
                            <Button variant="secondary" size="sm" block>{gettext("Attendance")}</Button>
                            <Button variant="secondary" size="sm" block>{gettext("Curriculum")}</Button>
                            <Button variant="secondary" size="sm" block>{gettext("Profile")}</Button>
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer/>
                    </Card>
                    <Card>
                        <Card.Body>
                        <Card.Title>{gettext("Schedule")}</Card.Title>
                        <Card.Text>
                            <Button variant="secondary" size="sm" block>{gettext("Personal")}</Button>
                            <Button variant="secondary" size="sm" block>{gettext("By Subjects")}</Button>
                            <Button variant="secondary" size="sm" block>{gettext("Enroll / Unsubscribe in Curricular Units")}</Button>
                            <Button variant="secondary" size="sm" block>{gettext("Enroll / Unsubscribe in Shifts")}</Button>
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer/>
                    </Card>
                </CardDeck>

                <div id="searchProfile">
                    <label htmlFor="basic-url">{gettext("Search Profile:")}</label>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder={gettext("Search Profile")}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                        <Button variant="outline-secondary">{gettext("Search")}</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
            </div>
        )
    }
}

export default MainMenu;