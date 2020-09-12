import React, { component, Component } from "react";
import axios from "axios";
import { Modal, Button, Form, Col, Alert } from "react-bootstrap";

export default class AddOfficers extends Component {
  render() {
    return (
      <div style={{ minHeight: "calc(100vh - 70px)" }}>
        <h1>बातमी बदल</h1>
        <form onSubmit={this.onWorkImageUpload} style={{ padding: "20px" }}>
          <div className="form-group">
            <label>संपूर्ण नाव</label>
            <input
              type="text"
              className="form-control"
              required
              //value={this.state.workTitle}
              //onChange={this.onWorkTitleChange}
            />
          </div>
          {/* <div className="form-group col-md-6">
              <label>दिनांक</label>
              <input
                type="date"
                className="form-control"
                required
                value={this.state.workDate}
                onChange={this.onWorkDateChange}
              />
            </div> */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>निवडून आलेले वार्ड</label>
              <input
                type="text"
                className="form-control"
                //  value={this.state.workImgDesc}
                //  onChange={this.onWorkDescChange}
                required
              ></input>
            </div>
            {/* <div className="form-group col-md-6">
              <input
                type="file"
                className="form-control-file"
                id="workPostImages"
                multiple
                //onChange={this.onWorkImageChange}
                required
              />
              </div> */}
            <div className="form-group col-md-6">
              <label>दूरध्वनी क्रमांक</label>
              <input
                type="text"
                className="form-control"
                //  value={this.state.workImgDesc}
                //  onChange={this.onWorkDescChange}
                required
              ></input>
            </div>
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control-file"
              id="workPostImages"
              multiple
              //onChange={this.onWorkImageChange}
              required
            />
          </div>
          <button type="submit">संक्रमित करा </button>
        </form>
      </div>
    );
  }
}
