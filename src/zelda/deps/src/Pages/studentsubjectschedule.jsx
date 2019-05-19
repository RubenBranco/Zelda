import React from 'react';
import ReactDOM from "react-dom";

import SubjectSchedule from "../Components/Schedules/subjectSchedule.jsx";

class StudentSubjectsSchedule extends React.Component{
    constructor() {
      super();
      this.state = {};

    }

    render () {
      return (<SubjectSchedule />);
    }
}

ReactDOM.render(<StudentSubjectsSchedule />, document.getElementById("main"));
export default StudentSubjectsSchedule;
