import React, { component, Component } from "react";
import axios from "axios";
//Notification component
import { store } from "react-notifications-component";

const DesignationList = (props) => (
  <option value={props.DesignationList.tbl_designation_id}>
    {props.DesignationList.tbl_designation_name}
  </option>
);
export default class AddEditEmployees extends Component {
  constructor(props) {
    super();
    this.state = {
      designationArr: [],
      employeeId: 0,
      fullName: "",
      electedWord: "",
      phoneNumber: "",
      designation: 0,
      selectedFile: null,
      ElectedPersonImg: "",
      imgDisplay: "none",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4500/humbrat/emp_designation")
      .then((response) => {
        this.setState({
          designationArr: response.data,
          designation: response.data[0].tbl_designation_id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    if (this.props.match.params.id > 0) {
      axios
        .get(
          "http://localhost:4500/humbrat/employee_list/" +
            this.props.match.params.id
        )
        .then((response) => {
          this.setState({
            employeeId: response.data[0].tbl_employee_id,
            fullName: response.data[0].tbl_employee_fullName,
            phoneNumber: response.data[0].tbl_employee_contact_no,
            designation: response.data[0].tbl_employee_designation,
            ElectedPersonImg: response.data[0].tbl_employee_img,
            imgDisplay: "inline",
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
  Designation() {
    if (this.state.designationArr.length > 0) {
      return this.state.designationArr.map(function (currentDesignation, i) {
        return (
          <DesignationList
            DesignationList={currentDesignation}
            key={i}
          ></DesignationList>
        );
      });
    }
  }
  onFullNameChange = (e) => {
    this.setState({
      fullName: e.target.value,
    });
  };
  onPhoneNumberChange = (e) => {
    this.setState({
      phoneNumber: e.target.value,
    });
  };
  onDesignationChange = (e) => {
    this.setState({
      designation: e.target.value,
    });
  };
  onEmployeeImageChange = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };
  onEmployeeUpload = (e) => {
    e.preventDefault();
    const employee = new FormData();
    if (
      this.state.selectedFile == undefined ||
      this.state.selectedFile == null ||
      this.state.selectedFile == ""
    ) {
    } else {
      employee.append(
        "employeeImg",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }
    employee.append("tbl_employee_id", this.state.employeeId);
    employee.append("tbl_employee_fullName", this.state.fullName);
    employee.append("tbl_employee_designation", this.state.designation);
    employee.append("tbl_employee_contact_no", this.state.phoneNumber);
    employee.append("tbl_employee_img", this.state.ElectedPersonImg);
    if (this.state.employeeId > 0) {
      axios
        .put("http://localhost:4500/humbrat/employee", employee)
        .then((res) => {
          console.log(res);
          this.setState({
            employeeId: this.state.employeeId,
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            designation: this.state.designation,
            selectedFile: "",
            //   ElectedPersonImg: this.state.selectedFile.name,
          });
          window.location.reload();
        });
    } else {
      axios
        .post("http://localhost:4500/humbrat/employee", employee)
        .then((res) => {
          console.log(res);
          this.setState({
            electedPersonId: 0,
            fullName: "",
            phoneNumber: "",
            designation: "",
            selectedFile: null,
          });
          store.addNotification({
            title: "नवीन कर्मचारी",
            message: "नवीन कर्मचार्याची माहिती यशस्वीपणे जतन झाली",
            type: "success",
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
        });
    }
  };

  render() {
    return (
      <div style={{ minHeight: "calc(100vh - 70px)" }}>
        <h2 style={{ margin: "20px" }}>कर्मचारी</h2>
        <hr
          style={{
            height: "10px",
            borderWidth: "0",
            boxShadow: " 0 10px 10px -10px #8c8c8c inset",
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(60, 179, 113), rgba(0, 0, 0, 0))",
          }}
        ></hr>
        <div
          style={{
            display: this.state.imgDisplay,
          }}
        >
          {this.state.ElectedPersonImg == "" ? null : (
            <img
              src={"/employees/" + this.state.ElectedPersonImg}
              className="rounded mx-auto d-block"
              alt="Employees image"
              // style={{ width: "300px", height: "300px" }}
            />
          )}
        </div>
        <form
          onSubmit={this.onEmployeeUpload}
          style={{ width: "70%", margin: "0 auto" }}
        >
          <div className="form-group">
            <label>संपूर्ण नाव</label>
            <input
              type="text"
              className="form-control"
              required
              value={this.state.fullName}
              onChange={this.onFullNameChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>पद</label>
              <select
                className="form-control"
                value={this.state.designation}
                onChange={this.onDesignationChange}
              >
                {this.Designation()}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>दूरध्वनी क्रमांक</label>
              <input
                type="text"
                className="form-control"
                value={this.state.phoneNumber}
                onChange={this.onPhoneNumberChange}
                required
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>छायाचित्र</label>
              <input
                type="file"
                className="form-control-file"
                onChange={this.onEmployeeImageChange}
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              संक्रमित करा
            </button>
          </div>
        </form>
      </div>
    );
  }
}
