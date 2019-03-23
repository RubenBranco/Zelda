import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";

class FrontPage extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    return (
      <div>
        <Navigator />
        <h1>hello world</h1>
      </div> 
    );
  }
}

ReactDOM.render(<FrontPage />, document.getElementById("main"));
export default FrontPage;