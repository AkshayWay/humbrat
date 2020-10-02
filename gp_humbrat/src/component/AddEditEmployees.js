import React, { component, Component } from "react";
import axios from "axios";

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
          designation: response.data[0].tbl_designaton_type,
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
    if (this.state.selectedFile == null) {
      alert("selectedFile " + this.state.selectedFile);
    }
    if (
      this.state.selectedFile == undefined ||
      this.state.selectedFile == null
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
    alert(this.state.employeeId);
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
            selectedFile: null,
          });
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
          // window.location.reload();
        });
    }
  };

  render() {
    return (
      <div style={{ minHeight: "calc(100vh - 70px)" }}>
        <h1>कर्मचारी</h1>
        <div
          style={{
            display: this.state.imgDisplay,
          }}
        >
          {this.state.ElectedPersonImg == "" ? (
            <h1>No image found</h1>
          ) : (
            <img
              src={"/employees/" + this.state.ElectedPersonImg}
              className="rounded mx-auto d-block"
              alt="Employees image"
              style={{ width: "300px", height: "300px" }}
            />
          )}
        </div>
        <form onSubmit={this.onEmployeeUpload} style={{ padding: "20px" }}>
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
          <button type="submit" className="btn btn-primary">
            संक्रमित करा
          </button>
        </form>
      </div>
    );
  }
}
