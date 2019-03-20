import React from "react";
import Form from "react-bootstrap/Form";

class LanguageSwitch extends React.Component {
  constructor() {
    super();
    this.state = {
      language: "PT"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.language == "PT") this.setState({ language: "EN"}) 
    else { this.setState({ language: "PT"})}
  }

  render() {
    return (
      <Form id="formLanguageSwitch" onSubmit={this.handleSubmit}>

      {this.state.language == "PT" ? (
          <button
          variant="primary"
          class="btn button_form_switch"
          type="submit"
          value="PT"
        >
          PT
        </button>
        ) : <button
        variant="primary"
        class="btn"
        type="submit"
        value="PT"
      >
        PT
      </button>}
        
        /

      {this.state.language == "EN" ? (
          <button
          variant="primary"
          class="btn button_form_switch"
          type="submit"
          value="EN"
        >
          EN
        </button>
        ) : <button
        variant="primary"
        class="btn"
        type="submit"
        value="EN"
      >
        EN
      </button>}
      </Form>
    );
  }
}

export default LanguageSwitch;
