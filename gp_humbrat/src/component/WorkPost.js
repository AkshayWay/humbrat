import React, { component, Component } from "react";
import axios from "axios";
// import { Card, CardDeck, Col } from "react-bootstrap";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   hashHistory,
// } from "react-router-dom";
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
        <div className="container">
          <div className="row">{workPostList}</div>
        </div>
      </div>
    );
  }
}
