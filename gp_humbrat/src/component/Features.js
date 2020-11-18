import React, { component, Component } from "react";
import axios from "axios";

export default class Features extends Component {
  constructor(props) {
    super(props);
    this.state = {
      villageFeatureArray: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4500/humbrat/village_features")
      .then((response) => {
        this.setState({
          villageFeatureArray: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  FeatureList() {
    if (this.state.villageFeatureArray.length > 0) {
      return this.state.villageFeatureArray.map(function (features, i) {
        return (
          <div className="card mb-3" style={{ maxWidth: 100 + "%" }}>
            <div className="row no-gutters">
              <div
                className="col-md-4"
                style={{
                  display: features.tbl_features_file_name ? "inline" : "none",
                }}
              >
                <img
                  src={"feature/" + features.tbl_features_file_name}
                  className="card-img"
                  alt={features.tbl_features_file_name}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h4 className="card-title">{features.tbl_features_title}</h4>
                  <p className="card-text" style={{ whiteSpace: "pre-line" }}>
                    {features.tbl_features_description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <div>
          <h5>वैशिष्ठ उपलब्ध नाही</h5>
        </div>
      );
    }
  }

  render() {
    return (
      <div style={{ minHeight: "calc(100vh - 70px)" }}>
        <h2 style={{ margin: "20px" }}>वैशिष्ठे</h2>
        <hr
          style={{
            height: "10px",
            borderWidth: "0",
            boxShadow: " 0 10px 10px -10px #8c8c8c inset",
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(60, 179, 113), rgba(0, 0, 0, 0))",
          }}
        ></hr>
        {this.FeatureList()}
      </div>
    );
  }
}
