import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import getCsrfToken from "../functions/csrf.js";
import Row from 'react-bootstrap/Row';


class WebCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            subjectDesignation: null,
        };

        this.csrfmiddlewaretoken = getCsrfToken();
    }

    componentDidMount () {
        if (this.props.subjectId != null) {
            fetch(`/api/student/${this.props.subjectId}/subjects/`, {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    this.setState({
                        subjectDesignation: data[0].designation,
                    })
                });
            });
        }
    }

    render() {
        return (
            <Breadcrumb>
                {this.props.subjectId != undefined 
                    ?
                    <Row>
                    {this.props.pages.map((page) => 
                        <Breadcrumb.Item href={page.href}>{page.name}</Breadcrumb.Item>
                    )}
                    <Breadcrumb.Item active>{this.state.subjectDesignation}</Breadcrumb.Item>
                    </Row>
                    : 
                    this.props.pages.map((page) =>
                    page.href === "" ? <Breadcrumb.Item active>{page.name}</Breadcrumb.Item> :
                    <Breadcrumb.Item href={page.href}>{page.name}</Breadcrumb.Item>
                )}
            </Breadcrumb>
        )
    }
}

export default WebCrumbs;
