import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import AppCSS from "../App.css";
import Logo from "../assets/images/Logo_humbrat.png";
import $ from "jquery";

$(document).on("click", ".nav-item", function (e) {
  $(this).addClass("active").siblings().removeClass("active");
});

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LoggedIn: false,
      redirect: false,
    };
  }
  componentDidMount() {
    if (
      localStorage.getItem("userEmail") != null &&
      localStorage.getItem("isLoggedIn") == 1
    ) {
      this.setState({
        LoggedIn: true,
      });
    }
  }

  logout() {
    this.setState({
      LoggedIn: false,
    });
    localStorage.clear();
  }

  render() {
    const UserLoggedIn = this.state.LoggedIn ? "inherit" : "none";
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary_change"
        style={{
          marginBottom: "10px",
          backgroundColor: "#563d7c!important",
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <a className="navbar-brand" href="/">
          <img
            src={Logo}
            width="50"
            height="50"
            alt="ग्रामपंचायत हुंबरट"
            style={{ borderRadius: "50%" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                मुख्य पृष्ठ
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/officer" className="nav-link">
                अधिकारी
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/WorkPost" className="nav-link">
                ग्रामपंचायत कार्य
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/features" className="nav-link">
                वैशिष्ठे
              </Link>
            </li>
            <li className="nav-item" style={{ display: UserLoggedIn }}>
              <Link to="/adminPortal" className="nav-link">
                प्रशासक
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="submit"
              onClick={() => this.logout()}
              style={{ display: UserLoggedIn }}
            >
              Log out
            </button>
          </form>
        </div>
      </nav>
    );
  }
}
export default Navigation;
