import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Redirect } from "react-router-dom";
import { Route } from "react-router";

//import { hashHistory } from "react-router";
import { HashRouter } from "react-router-dom";

import home from "./HomePage";

const CLIENT_ID =
  "970882172543-f75muk11713q0f5tg6e7dof1ol68vc5v.apps.googleusercontent.com";

const AuthRoute = (props) => {
  return (
    <HashRouter>
      <Route path="/" component={home} />
    </HashRouter>
  );
};
class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: "",
      redirect: false,
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login(response) {
    //const history = useHistory();

    if (response.accessToken) {
      console.log("Response:", response.profileObj);
      console.log("Email:", response.profileObj.email);
      if (response.profileObj.email == "waingankar.akshay95@gmail.com") {
        {
          this.setState({ redirect: true });
        }

        //  history.push("/adminPortal");
        // this.props.router.push("/adminPortal");
      } else {
        return alert("Unsuccessfull");
      }
      // this.setState((state) => ({
      //   isLogined: true,
      //   accessToken: response.accessToken,
      // }));
    }
  }
  // componentWillMount() {
  //   hashHistory.push("/adminPortal");
  // }
  logout(response) {
    this.setState((state) => ({
      isLogined: false,
      accessToken: "",
    }));
  }

  handleLoginFailure(response) {
    alert("Failed to log in");
  }

  handleLogoutFailure(response) {
    alert("Failed to log out");
  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect push to="/" /> : null}
        {this.state.isLogined ? (
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          ></GoogleLogout>
        ) : (
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        )}
        {this.state.accessToken ? (
          <h5>
            Your Access Token: <br />
            <br /> {this.state.accessToken}
          </h5>
        ) : null}
      </div>
    );
  }
}

export default GoogleBtn;
