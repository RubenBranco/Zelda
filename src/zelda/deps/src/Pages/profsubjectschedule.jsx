import React from 'react';
import ReactDOM from "react-dom";

import SubjectSchedule from "../Components/Schedules/subjectSchedule.jsx";


class ProfSubjectsSchedule extends React.Component{
    constructor() {
      super();
      this.state = {};

    }

    render () {
      return (<SubjectSchedule />);
    }
}

ReactDOM.render(<ProfSubjectsSchedule />, document.getElementById("main"));
export default ProfSubjectsSchedule;
