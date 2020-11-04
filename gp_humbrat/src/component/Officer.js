import React, { Component } from "react";
import axios from "axios";

class Office extends Component {
  constructor() {
    super();
    this.state = {
      memberShow: true,
      officersShow: true,
      electedPersonArr: [],
      employeeArr: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4500/humbrat/elected_person_list")
      .then((response) => {
        this.setState({
          electedPersonArr: response.data,
        });
      });

    axios
      .get("http://localhost:4500/humbrat/employee_list")
      .then((response) => {
        this.setState({
          employeeArr: response.data,
        });
      });
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
      memberIcon = (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-chevron-double-up"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"
          />
          <path
            fill-rule="evenodd"
            d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
          />
        </svg>
      );
    } else {
      memberIcon = (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-chevron-double-down"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
          <path
            fill-rule="evenodd"
            d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      );
    }
    if (this.state.officersShow) {
      officerIcon = (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-chevron-double-up"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"
          />
          <path
            fill-rule="evenodd"
            d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
          />
        </svg>
      );
    } else {
      officerIcon = (
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-chevron-double-down"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
          <path
            fill-rule="evenodd"
            d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      );
    }

    return (
      <div style={{ marginTop: 20 + "px", minHeight: "calc(100vh - 70px)" }}>
        <div id="Members">
          <h2 style={{ margin: "20px" }}>अधिकारी</h2>
          <hr
            style={{
              height: "10px",
              borderWidth: "0",
              boxShadow: " 0 10px 10px -10px #8c8c8c inset",
              backgroundImage:
                "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(60, 179, 113), rgba(0, 0, 0, 0))",
            }}
          ></hr>
          <div style={{ textAlign: "center" }}>
            <h4>सदस्य</h4>
          </div>
          <button
            className="btn btn-outline-warning"
            type="button"
            data-toggle="collapse"
            data-target="#collapseMember"
            aria-expanded="false"
            aria-controls="collapseMember"
            onClick={() => this.collapseMemberIcon(1)}
            style={{ margin: "5px" }}
          >
            {memberIcon}
          </button>
          <div className="collapse show" id="collapseMember">
            {this.state.electedPersonArr == "" ? (
              <div>
                <h2>माहिती उपलब्ध नाही</h2>
              </div>
            ) : (
              <div>
                {this.state.electedPersonArr.map((item, idx) => (
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
                        <img
                          src={
                            "./elected_person/" +
                            this.state.electedPersonArr[idx]
                              .tbl_elected_person_img
                          }
                          className="card-img"
                          alt={
                            this.state.electedPersonArr[idx]
                              .tbl_elected_person_img
                          }
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h4 className="card-title">
                            <b>
                              {
                                this.state.electedPersonArr[idx]
                                  .tbl_elected_person_fullname
                              }{" "}
                            </b>
                          </h4>
                          <h5>
                            {
                              this.state.electedPersonArr[idx]
                                .tbl_designation_name
                            }
                          </h5>
                          <h5>
                            {
                              this.state.electedPersonArr[idx]
                                .tbl_elected_person_ward
                            }
                          </h5>
                          <p className="card-text">
                            संपर्क :
                            {
                              this.state.electedPersonArr[idx]
                                .tbl_elected_person_contact_no
                            }
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div id="Officers">
          <div style={{ textAlign: "center" }}>
            <h4>कर्मचारी </h4>
          </div>
          <button
            className="btn btn-outline-warning"
            type="button"
            data-toggle="collapse"
            data-target="#collapseOfficers"
            aria-expanded="false"
            aria-controls="collapseOfficers"
            onClick={() => this.collapseMemberIcon(2)}
            style={{ margin: "5px" }}
          >
            {officerIcon}
          </button>
          <div className="collapse show" id="collapseOfficers">
            {this.state.employeeArr == "" ? (
              <div>
                <h2>माहिती उपलब्ध नाही</h2>
              </div>
            ) : (
              <div>
                {this.state.employeeArr.map((item, idx) => (
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
                        <img
                          src={
                            "./employees/" +
                            this.state.employeeArr[idx].tbl_employee_img
                          }
                          className="card-img"
                          alt={this.state.employeeArr[idx].tbl_employee_img}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h4 className="card-title">
                            <b>
                              {
                                this.state.employeeArr[idx]
                                  .tbl_employee_fullName
                              }
                            </b>
                          </h4>
                          <h5>
                            {this.state.employeeArr[idx].tbl_designation_name}
                          </h5>
                          <p className="card-text">
                            संपर्क :
                            {
                              this.state.employeeArr[idx]
                                .tbl_employee_contact_no
                            }
                            .
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Office;
