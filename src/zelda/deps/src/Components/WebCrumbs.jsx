import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


class WebCrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Breadcrumb>
                {this.props.pages.map((page) =>
                    page.href === "" ? <Breadcrumb.Item active>{page.name}</Breadcrumb.Item> :
                    <Breadcrumb.Item href={page.href}>{page.name}</Breadcrumb.Item>
                )}
            </Breadcrumb>
        )
    }
}

export default WebCrumbs;
