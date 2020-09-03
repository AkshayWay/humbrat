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
  render() {
    let FeatureList = this.state.villageFeatureArray.map(function (
      features,
      i
    ) {
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
                <p className="card-text">{features.tbl_features_description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h1>Features here</h1>
        {FeatureList}
      </div>
    );
  }
}
