import React from 'react';
import ReactDOM from "react-dom";
import Navigator from "../Components/Navigator.jsx";
import Schedule from "../Components/Schedule.jsx";

import getCsrfToken from "../functions/csrf.js";


class StudentTimeTable extends React.Component{
    constructor() {
        super();
        this.state = {
            classes: [],
        };
        this.csrfmiddlewaretoken = getCsrfToken();
    }

    componentDidMount() {
        if (!this.state.classes.length) {
            fetch('/api/timetable_lesson_spec/my_timetable/', {
                method: 'GET',
                headers: {
                    "X-CSRFToken": this.csrfmiddlewaretoken,
                },
            }).then(response => {
                response.json().then(data => {
                    this.setState(prevState => ({
                        classes: [...prevState.classes, ...data]
                    }))
                })
            })
        }
    }

    render () {
        return (
         <div>
            <Navigator />
            {!this.state.classes.length ? null :
                <Schedule classes={this.state.classes}/>
            }
          </div>
        );
    }
}

ReactDOM.render(<StudentTimeTable />, document.getElementById("main"));
export default StudentTimeTable;
