import React, { component, Component } from "react";
import AppCSS from "../App.css";

class Footer extends Component {
  render() {
    return (
      <div style={{ marginTop: "10px" }}>
        <footer
          className="bg-primary_change"
          styele={{ borderRadius: "10px 10px 0px 0px" }}
        >
          <small>&copy;2020 All rights reserved</small>
        </footer>
      </div>
    );
  }
}

export default Footer;
