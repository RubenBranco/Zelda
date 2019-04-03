import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import SearchStudentsAttendance from "../Components/Searches/SearchStudentsAttendance.jsx";

class Profattendances extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    return (
      <div>
        <Navigator />
        <SearchStudentsAttendance />
      </div> 
    );
  }
}

ReactDOM.render(<Profattendances />, document.getElementById("main"));
export default Profattendances;