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
      electedPersonId: 0,
      fullName: "",
      electedWord: "",
      phoneNumber: "",
      designation: 0,
      designation: 0,
      selectedFile: null,
      electedPersonArr: [],
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
          "http://localhost:4500/humbrat/elected_person_list/" +
            this.props.match.params.id
        )
        .then((response) => {
          this.setState({
            electedPersonArr: response.data,
            electedPersonId: response.data[0].tbl_elected_person_id,
            fullName: response.data[0].tbl_elected_person_fullname,
            electedWord: response.data[0].tbl_elected_person_ward,
            phoneNumber: response.data[0].tbl_elected_person_contact_no,
            designation: response.data[0].tbl_elected_person_designation,
            ElectedPersonImg: response.data[0].tbl_elected_person_img,
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
              src={"/elected_person/" + this.state.ElectedPersonImg}
              className="rounded mx-auto d-block"
              alt="Electer person image"
              style={{ width: "300px", height: "300px" }}
            />
          )}
        </div>
        <form onSubmit={this.onElectedPersonUpload} style={{ padding: "20px" }}>
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
                //onChange={this.onElectedPersonImageChange}
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
