import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";


class CoursesList extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        return (
            <Card>
                <Card.Header className="text-center cardheader font-weight-bold">
                {gettext("Subjects")}
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        {this.props.courses.map(course => {
                            <ListGroup.Item action>
                                <a href={course.href}>course.designation</a>
                            </ListGroup.Item>
                        })
                        }
                    </ListGroup>
                </Card.Body>
                <Card.Footer />
            </Card>
        )
    }
}

export default CoursesList;
