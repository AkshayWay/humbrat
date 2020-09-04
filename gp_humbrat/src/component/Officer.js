import React, { Component } from "react";
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
import gp_literacy from "../assets/images/archana.jpeg";

class Office extends Component {
  constructor() {
    super();
    this.state = {
      memberShow: true,
      officersShow: true,
    };
  }
  collapseMemberIcon(e) {
    if (e == 1) {
      this.setState({
        memberShow: !this.state.memberShow,
      });
    } else {
      this.setState({
        officersShow: !this.state.officersShow,
      });
    }
  }
  render() {
    var memberIcon;
    var officerIcon;
    if (this.state.memberShow) {
      memberIcon = "fa fa-angle-double-up";
    } else {
      memberIcon = "fa fa-angle-double-down";
    }
    if (this.state.officersShow) {
      officerIcon = "fa fa-angle-double-up";
    } else {
      officerIcon = "fa fa-angle-double-down";
    }

    return (
      <div style={{ marginTop: 20 + "px", minHeight: "calc(100vh - 70px)" }}>
        <div id="Members">
          <div style={{ textAlign: "center" }}>
            <h4>सदस्य</h4>
          </div>
          {/* <a
            className="btn btn-primary"
            data-toggle="collapse"
            href="#collapseMember"
            role="button"
            aria-expanded="false"
            aria-controls="collapseMember"
            id="MemberId"
            onClick={() => this.collapseMemberIcon}
          >
            <i className={memberIcon}></i>
          </a> */}
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseMember"
            aria-expanded="false"
            aria-controls="collapseMember"
            onClick={() => this.collapseMemberIcon(1)}
          >
            <i className={memberIcon}></i>
          </button>
          <div className="collapse show" id="collapseMember">
            <div
              className="card mb-3 shadow p-3 mb-5 bg-white rounded"
              style={{
                maxWidth: 740 + "px",
                margin: "auto",
                textAlign: "center",
              }}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={gp_literacy} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title">
                      <b>सौ. अर्चना अरविंद वायंगणकर </b>
                    </h4>
                    <h5>सरपंच </h5>
                    <p className="card-text">संपर्क : ९६०४४९०९३९ .</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card mb-3 shadow p-3 mb-5 bg-white rounded"
              style={{
                maxWidth: 740 + "px",
                margin: "auto",
                textAlign: "center",
              }}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={gp_literacy} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title">
                      <b>सौ. अर्चना अरविंद वायंगणकर </b>
                    </h4>
                    <h5>सरपंच </h5>
                    <p className="card-text">संपर्क : ९६०४४९०९३९ .</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="Officers">
          <div style={{ textAlign: "center" }}>
            <h4>कर्मचारी </h4>
          </div>
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseOfficers"
            aria-expanded="false"
            aria-controls="collapseOfficers"
            onClick={() => this.collapseMemberIcon(2)}
          >
            <i className={officerIcon}></i>
          </button>
          <div className="collapse show" id="collapseOfficers">
            <div
              className="card mb-3 shadow p-3 mb-5 bg-white rounded"
              style={{
                maxWidth: 740 + "px",
                margin: "auto",
                textAlign: "center",
              }}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={gp_literacy} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title">
                      <b>सौ. अर्चना अरविंद वायंगणकर </b>
                    </h4>
                    <h5>सरपंच </h5>
                    <p className="card-text">संपर्क : ९६०४४९०९३९ .</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card mb-3 shadow p-3 mb-5 bg-white rounded"
              style={{
                maxWidth: 740 + "px",
                margin: "auto",
                textAlign: "center",
              }}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={gp_literacy} className="card-img" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title">
                      <b>सौ. अर्चना अरविंद वायंगणकर </b>
                    </h4>
                    <h5>सरपंच </h5>
                    <p className="card-text">संपर्क : ९६०४४९०९३९ .</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Office;
