import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import ReactBootstrap, {
  Navbar,
  Button,
  Nav,
  Col,
  Form,
  FormControl,
  Grid,
  Panel,
  FormGroup,
} from "react-bootstrap";
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          ग्रामपंचायत हुंबरट
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
            <li className="nav-item">
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
            <li className="nav-item" style={{ display: UserLoggedIn }}>
              <Link to="/adminPortal" className="nav-link">
                प्रशासक
              </Link>
            </li>
            <li className="nav-item">
              {/* <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a> */}
              <div
                className="nav-link"
                aria-labelledby="navbarDropdown"
                style={{ display: UserLoggedIn }}
              >
                <button className="dropdown-item" onClick={() => this.logout()}>
                  Log out
                </button>
                {/* <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Something else here
                </a> */}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Navigation;
