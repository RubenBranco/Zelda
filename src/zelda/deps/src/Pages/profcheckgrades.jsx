import React from "react";
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import ProfSearchStudentsSubjectGrades from "../Components/Searches/ProfSearchStudentsSubjectGrades.jsx";

class ProfCheckGrades extends React.Component {
    constructor() {
        super();
        this.state;
    }

    render() {
        return (
            <div>
                <Navigator />
                <ProfSearchStudentsSubjectGrades />
            </div>
        );
    }
}

ReactDOM.render(<ProfCheckGrades />, document.getElementById("main"));
export default ProfCheckGrades;
