import React from "react";
import Image from "react-bootstrap/Image";
import StudentMenu from "./Menus/StudentMenu.jsx";


class MainMenu extends React.Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            userRole: null,
        };
    }

    componentDidMount() {
        let csrfmiddlewaretoken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
        fetch("/api/appuser/describe_self/", {
            method: "GET",
            headers: {
                "X-CSRFToken": csrfmiddlewaretoken,
            },
        }).then(response => {
            response.json().then(data => {
                this.setState({
                    userRole: data.user_type,
                });
            })
        });
    }

    render() {
        let menu = null;
        if (this.state.userRole === "Student") {
            menu = <StudentMenu />;
        }
        
        return (
            <div>
                <div id="img">
                    <Image src={window.backgroundImg} id="img_background_all" />
                </div>
                <div id="mainMenu">
                    {menu}
                </div>
            </div>
        );
    }
}

export default MainMenu;
