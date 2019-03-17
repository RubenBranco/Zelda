import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "../Components/LoginForm.jsx";
// import LanguageSwitch from "../Components/LanguageSwitch";
import Image from "react-bootstrap/Image";

class Login extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    return (
      <div id="login">
        <div id="form">
          <LoginForm url={window.url} />
          {/* <LanguageSwitch /> */}
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
