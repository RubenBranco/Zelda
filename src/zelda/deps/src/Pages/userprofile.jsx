import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../Components/Navigator.jsx";
import ViewProfile from "../Components/ViewProfile.jsx";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state;
  }

  render() {
    return (
      <div>
        <Navbar />
        <div id="webcrumbs"> <a>{gettext("Home")}</a> > <a> {gettext("Consultar Perfil")}</a> </div>
        <ViewProfile />
      </div>
    );
  }
} xx

ReactDOM.render(<UserProfile />, document.getElementById("main"));
export default UserProfile;
