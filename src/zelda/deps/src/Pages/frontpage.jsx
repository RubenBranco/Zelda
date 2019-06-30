import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import MainMenu from '../Components/MainMenu.jsx';

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
      </div>
    );
  }
}

ReactDOM.render(<FrontPage />, document.getElementById("main"));
export default FrontPage;
