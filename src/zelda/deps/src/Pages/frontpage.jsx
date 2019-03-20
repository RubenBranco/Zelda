import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "../Components/LoginForm.jsx";
import LanguageSwitch from "../Components/LanguageSwitch.jsx";
import Image from "react-bootstrap/Image";

class FrontPage extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    return (
      <div id="login">
        <div id="formLanguageSwitch">
          <LanguageSwitch />
        </div>

        <div id="form">
          <LoginForm url={window.url} />
        </div>
        <div id="img">
          <Image src={window.backgroundImg} id="img_background" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<FrontPage />, document.getElementById("main"));
export default FrontPage;
