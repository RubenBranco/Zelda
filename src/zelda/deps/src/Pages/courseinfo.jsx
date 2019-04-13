import React from 'react';
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";


class CourseInfo extends React.Component{
    constructor() {
        super();
        this.state;
      }

    render () {
        return (
         <div>
            <Navigator />
          </div>
        );
    }
}

ReactDOM.render(<CourseInfo />, document.getElementById("main"));
export default CourseInfo;
