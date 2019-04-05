import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

class SubjectList extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Card>
                <Card.Header className="text-center cardheader font-weight-bold">
                {gettext("Subjects")}
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        {this.props.courses.map(course =>
                            <ListGroup.Item action>
                                <a href={course.href}>{course.designation}</a>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card.Body>
                <Card.Footer />
            </Card>
        );
    }
}

export default SubjectList;