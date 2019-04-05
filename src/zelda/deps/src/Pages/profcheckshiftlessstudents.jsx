import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import SearchShiftlessStudents from "../Components/Searches/SearchShiftlessStudents.jsx";

class ProfCheckShiftlessStudents extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    return (
      <div>
        <Navigator />
        <SearchShiftlessStudents />
      </div> 
    );
  }
}

ReactDOM.render(<ProfCheckShiftlessStudents />, document.getElementById("main"));
export default ProfCheckShiftlessStudents;