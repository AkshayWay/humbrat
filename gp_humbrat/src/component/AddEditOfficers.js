import React, { component, Component } from "react";
import axios from "axios";
import { Modal, Button, Form, Col, Alert } from "react-bootstrap";
import { store } from 'react-notifications-component';


const DesignationList = (props) => (
  <option value={props.DesignationList.tbl_designation_id}>
    {props.DesignationList.tbl_designation_name}
  </option>
);
export default class AddEditOfficers extends Component {
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
      ElectedPersonImg: "",
      imgDisplay: "none",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4500/humbrat/designation")
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
  onWordChange = (e) => {
    this.setState({
      electedWord: e.target.value,
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
  onElectedPersonImageChange = (e) => {
    this.setState({
      //  selectedFiles: [...this.state.files, ...e.target.files],
      selectedFile: e.target.files[0],
    });
  };
  onElectedPersonUpload = (e) => {
    e.preventDefault();
    const electedPerson = new FormData();
   
    if (
      this.state.selectedFile == undefined ||
      this.state.selectedFile == null || this.state.selectedFile ==""
    ) {
    } else {
      electedPerson.append(
        "electedPersonImg",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }
    electedPerson.append("tbl_elected_person_id", this.state.electedPersonId);
    electedPerson.append("tbl_elected_person_fullname", this.state.fullName);
    electedPerson.append("tbl_elected_person_ward", this.state.electedWord);
    electedPerson.append(
      "tbl_elected_person_designation",
      this.state.designation
    );
    electedPerson.append(
      "tbl_elected_person_contact_no",
      this.state.phoneNumber
    );
    if (this.state.electedPersonId > 0) {
      axios
        .put("http://localhost:4500/humbrat/elected_person", electedPerson)
        .then((res) => {
          console.log(res);
          this.setState({
            electedPersonId: this.state.electedPersonId,
            fullName: this.state.fullName,
            electedWord: this.state.electedWord,
            phoneNumber: this.state.phoneNumber,
            designation: this.state.designation,
            selectedFile: null,
          });
          window.location.reload();
        });
    } else {
      axios
        .post("http://localhost:4500/humbrat/elected_person", electedPerson)
        .then((res) => {
          console.log(res);
          this.setState({
            electedPersonId: 0,
            fullName: "",
            electedWord: "",
            phoneNumber: "",
            designation: "",
            selectedFile: null,
          });
          store.addNotification({
            title: "नवीन अधिकारी",
            message: "नवीन अधिकाऱ्याची माहिती यशस्वीपणे जतन झाली",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 4000,
              onScreen: true,
              showIcon:true
            },
            width:600
          });
        });
    }
  };

  render() {
    return (
      <div style={{ minHeight: "calc(100vh - 70px)" }}>
        <h1>अधिकारी</h1>
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
              <label>निवडून आलेले वार्ड</label>
              <input
                type="text"
                className="form-control"
                value={this.state.electedWord}
                onChange={this.onWordChange}
                required
              ></input>
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
              <label>पद</label>
              <select
                className="form-control"
                // value={this.state.designationArr.filter(
                //   ({ tbl_designation_id }) =>
                //     tbl_designation_id === this.state.selectedDesignation
                // )}
                value={this.state.designation}
                onChange={this.onDesignationChange}
              >
                {this.Designation()}
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>छायाचित्र</label>
              <input
                type="file"
                className="form-control-file"
                // value={this.state.selectedFile}
                //multiple
                onChange={this.onElectedPersonImageChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            संक्रमित करा
          </button>
        </form>

        {/* <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                type="text"
                className="form-control"
                required
                //onChange={this.onElectedPersonImageChange}
              />
            </div>
            <div className="form-group col-md-6">
              <button type="submit" className="btn btn-primary">
                संक्रमित करा
              </button>
            </div>
          </div>
        </form> */}
      </div>
    );
  }
}
