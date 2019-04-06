import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { urlParamEncode } from "../functions/url.js";

class LanguageSwitch extends React.Component {
    constructor() {
        super();
        this.state = {};

        this.handleClick = this.handleClick.bind(this);
        this.languages = [window.currentLanguage, ...window.otherLanguages];
    }

    handleClick(event) {
        let payload = {
            'csrfmiddlewaretoken': document.getElementsByName("csrfmiddlewaretoken")[0].value,
            'next': '',
            'language': event.target.value,
        };
        fetch(window.changeLangUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: urlParamEncode(payload),
        }).then(function(response) {
            if (response.ok && response.status === 200) {
                location.reload();
            }
        });
    }

    render() {
        return (
            <Form id="formLanguageSwitch">
                {this.languages.map((language) =>
                    <Button
                        variant="primary"
                        className="btn button_form_switch"
                        type="button"
                        onClick={this.handleClick}
                        size="sm"
                        value={language.code}
                    >
                        {language.name}
                    </Button>
                )}
            </Form>
        );
    }
}

export default LanguageSwitch;
