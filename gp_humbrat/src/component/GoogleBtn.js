import React, { Component } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Redirect } from "react-router-dom";
import { Route } from "react-router";
import { browserHistory } from "react-router";
//import { hashHistory } from "react-router";
import { store } from "react-notifications-component";
import axios from "axios";

import App from "../App.css";

import Admin from "./AdminPortal";

const CLIENT_ID =
  "970882172543-f75muk11713q0f5tg6e7dof1ol68vc5v.apps.googleusercontent.com";

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
      var obj = { tbl_user_email: response.profileObj.email };
      console.log("Email:" + obj.tbl_user_email);
      axios
        // .post("http://localhost:4500/humbrat/check_user", obj) https://dev.humbrat.co.in/sign_in
        .post("http://localhost:3306/humbrat/check_user", obj)
        .then((res) => {
          console.log("Is user there:", res.data.message);
          if (res.data.message == 1) {
            localStorage.setItem("userEmail", response.profileObj.email);
            localStorage.setItem("isLoggedIn", 1);
            this.setState({ redirect: true });
          } else {
            localStorage.setItem("userEmail", null);
            localStorage.setItem("isLoggedIn", 0);

            store.addNotification({
              title: "लॉग इन माहिती तपासून पहा",
              message:
                "तुमचा ई-मेल किंवा पासवर्ड तपासून बघा.अथवा तुम्ही वैध व्यक्ती नाही आहात.",
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 4000,
                onScreen: true,
                showIcon: true,
              },
              width: 600,
            });
          }
        });
    }
  }
  logout(response) {
    this.setState((state) => ({
      isLogined: false,
      accessToken: "",
    }));
  }

  handleLoginFailure(response) {
    store.addNotification({
      title: "लॉग इन माहिती तपासून पहा",
      message:
        "तुमचा ई-मेल किंवा पासवर्ड तपासून बघा.अथवा तुम्ही वैध व्यक्ती नाही आहात.",
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: true,
        showIcon: true,
      },
      width: 600,
    });
  }

  handleLogoutFailure(response) {
    store.addNotification({
      title: "लॉग इन माहिती तपासून पहा",
      message:
        "तुमचा ई-मेल किंवा पासवर्ड तपासून बघा.अथवा तुम्ही वैध व्यक्ती नाही आहात.",
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        onScreen: true,
        showIcon: true,
      },
      width: 600,
    });
  }

  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect push to="/AdminPortal" /> : null}
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
            buttonText="LOG IN"
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
