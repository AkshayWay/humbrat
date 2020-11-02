import React, { component, Component } from "react";
import axios from "axios";
import WorkCard from "./WorkCard";

export default class WorkPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workPostArray: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4500/humbrat/work_thumbnails")
      .then((response) => {
        this.setState({
          workPostArray: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    let workPostList = this.state.workPostArray.map(function (workPost, i) {
      return (
        <div
          className="col-6 col-md-4 shadow-sm bg-light rounded"
          style={{ paddingTop: "20px" }}
        >
          <WorkCard workPost={workPost} key={i} />
        </div>
      );
    });
    return (
      <div style={{ minHeight: "calc(100vh - 70px)" }}>
        <h2 style={{ margin: "20px" }}>ग्रामपंचायत कार्य</h2>
        <hr
          style={{
            height: "10px",
            borderWidth: "0",
            boxShadow: " 0 10px 10px -10px #8c8c8c inset",
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(60, 179, 113), rgba(0, 0, 0, 0))",
          }}
        ></hr>
        <div className="container">
          <div className="row">{workPostList}</div>
        </div>
      </div>
    );
  }
}
