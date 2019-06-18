import React from "react";
import ReactDOM from "react-dom";
import MenuProfLateral from "../Components/Menus/MenuProfLateral.jsx";
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
        <MenuProfLateral />
        <div class="resto-pagina2">
        <SearchShiftlessStudents />
        </div>
      </div> 
    );
  }
}

ReactDOM.render(<ProfCheckShiftlessStudents />, document.getElementById("main"));
export default ProfCheckShiftlessStudents;