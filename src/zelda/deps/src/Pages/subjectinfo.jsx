import React from 'react';
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import ViewCurricularUnitData from "../Components/ViewCurricularUnitData.jsx";


class SubjectInfo extends React.Component{
    constructor() {
        super();
        
      }

    render () {
        return (
         <div>
            <Navigator />
            <ViewCurricularUnitData />
          </div>
        );
    }
}

ReactDOM.render(<SubjectInfo />, document.getElementById("main"));
export default SubjectInfo;
