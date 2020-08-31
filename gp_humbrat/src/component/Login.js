import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import GoogleBtn from "./GoogleBtn";
import SignIn from "../assets/images/akshay.JPG";
import App from "../App.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workPostArray: [],
    };
  }

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img src={SignIn} id="icon" alt="User Icon" className="rounded" />
          </div>
          <form>
            {/* <input
              type="text"
              id="login"
              className="fadeIn second"
              name="login"
              placeholder="login"
            /> */}
            <label id="login_title" className="fadeIn second" name="login">
              <h1>ग्रामपंचायत हुंबरट</h1>
            </label>
            <label id="login_subtitle" className="fadeIn second" name="login">
              <h3>सहर्ष स्वागत करत आहे </h3>
            </label>
            <GoogleBtn className="fadeIn fourth" />
            {/* <input type="submit" className="fadeIn fourth" value="Log In" /> */}
          </form>

          <div id="formFooter">
            <a className="underlineHover">
              ह्या वेबसाईटचे सर्व अधिकार ग्रामपंचायत हुंबरट यांचं कडे आहेत
            </a>
          </div>
        </div>
      </div>
      // <div className="text-center">
      //   <img
      //     src={SignIn}
      //     alt="gif"
      //     className="rounded"
      //     style={{ zIndex: "-1" }}
      //   ></img>
      //   <div>
      //     <GoogleBtn />
      //   </div>
      // </div>
    );
  }
}
