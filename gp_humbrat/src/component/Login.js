import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import GoogleBtn from "./GoogleBtn";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workPostArray: [],
    };
  }
  componentDidMount() {
    //  document.getElementById('navigation-bar')!.style.display = "none";
  }

  componentWillUnmount() {
    //document.getElementById('navigation-bar')!.style.display = "flex";
  }
  render() {
    return (
      <form>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
            <GoogleBtn />
          </div>
        </div>
        <Link to="/">Click here</Link>
        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}
