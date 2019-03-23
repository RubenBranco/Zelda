import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "../Components/LoginForm.jsx";
import LanguageSwitch from "../Components/LanguageSwitch.jsx";
import Image from "react-bootstrap/Image";

class Login extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    return (
      <div id="login">
        <LanguageSwitch />
        <navbar />
        <div id="logos">
          <Image src={window.zeldaLogo} id="img_form" />
          <Image src={window.fculLogo} id="logo_uni" />
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

ReactDOM.render(<Login />, document.getElementById("main"));
export default Login;
