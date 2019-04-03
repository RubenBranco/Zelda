import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import MainMenu from '../Components/MainMenu.jsx';

class Profattendances extends React.Component {
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

ReactDOM.render(<Profattendances />, document.getElementById("main"));
export default Profattendancess;