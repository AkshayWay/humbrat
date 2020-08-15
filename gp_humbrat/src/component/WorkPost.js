import React, { component, Component } from "react";
import axios from "axios";
import { Card, CardDeck, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
  // Row,
  // Container,
} from "react-router-dom";
//import { Container, Row } from "reactstrap";
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
    console.log("this.state.workPostArray", this.state.workPostArray);
    let workPostList = this.state.workPostArray.map(function (workPost, i) {
      return (
        <div className="col-6 col-md-4">
          <WorkCard workPost={workPost} key={i} />
        </div>
      );
    });
    return (
      <div>
        <h2>Work post here</h2>
        <div className="container">
          <div className="row">{workPostList}</div>
        </div>
      </div>
    );
  }
}
