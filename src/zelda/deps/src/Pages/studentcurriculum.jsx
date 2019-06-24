import React from 'react';
import ReactDOM from "react-dom";

import Navigator from "../Components/Navigator.jsx";
import MenuStudLateral from "../Components/Menus/MenuStudLateral.jsx";


class StudentCurriculum extends React.Component {
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

ReactDOM.render(<StudentCurriculum />, document.getElementById("main"));
export default StudentCurriculum;
