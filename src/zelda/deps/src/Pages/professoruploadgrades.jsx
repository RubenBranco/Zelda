import React from 'react';
import ReactDOM from "react-dom";

import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";
import Navigator from "../Components/Navigator.jsx";


class ProfessorUploadGrades extends React.Component {
    constructor() {
      super();

    }

    render() {
      return (
        <div>
          <Navigator />
          <MenuStudLateral />
        </div>
      );
    }
  }

  ReactDOM.render(<ProfessorUploadGrades />, document.getElementById("main"));
  export default ProfessorUploadGrades;
