import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import MainMenu from '../Components/MainMenu.jsx';
import LanguageSwitch from "../Components/LanguageSwitch.jsx"

class FrontPage extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    return (
      <div>

        <Navigator />
        <MainMenu />
        <footer><LanguageSwitch /> </footer>
      </div>
    );
  }
}

ReactDOM.render(<FrontPage />, document.getElementById("main"));
export default FrontPage;