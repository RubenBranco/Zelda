import React from "react";
///simport Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class LanguageSwitch extends React.Component {
  constructor() {
    super();
    this.state = {
      language: "PT"
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (this.state.language == "PT") {
      this.setState({
        language: "EN"
      });
    } else {
      this.setState({
        language: "PT"
      });
    }
    console.log(this.state);
  }

  render() {
    return (
      <Form id="formLanguageSwitch">
        <button
          variant="primary"
          class="btn button_form_switch "
          type="submit"
          onClick={this.handleClick}
        >
          PT
        </button>
        /
        <button
          variant="primary"
          class="btn button_form_switch"
          type="submit"
          onClick={this.handleClick}
        >
          EN
        </button>
      </Form>
    );
  }
}

export default LanguageSwitch;
