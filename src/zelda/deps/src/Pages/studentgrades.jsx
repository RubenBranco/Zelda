import React from 'react';
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import SearchStudentSubjectGrades from "../Components/Searches/SearchStudentSubjectGrades.jsx";

class StudentGrades extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        <Navigator />
        <SearchStudentSubjectGrades />
      </div>
    );
  }
}

ReactDOM.render(<StudentGrades />, document.getElementById("main"));
export default StudentGrades;