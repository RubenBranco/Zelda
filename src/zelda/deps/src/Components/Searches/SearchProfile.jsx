import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";


class ProfileSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
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
                        <i className="fas fa-search" />
                    </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}

export default ProfileSearch;
