import React, { component, Component } from "react";
import axios from "axios";
import { Card, CardDeck, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";

const WorkList = (props) => (
  <CardDeck>
    <Card>
      <Card.Img
        variant="top"
        src={"work/" + props.workInfo.tbl_work_images_title}
        className="img-thumbnail"
      />
      <Card.Body>
        <Card.Title>{props.workInfo.tbl_work_images_title}</Card.Title>
        <Card.Text>
          {props.workInfo.tbl_work_images_title}
          <Link to="/WorkDetails" className="nav-link">
            सविस्तर माहिती
          </Link>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{props.workInfo.tbl_work_date}</small>
      </Card.Footer>
    </Card>
  </CardDeck>
);

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
  workPostList() {
    if (this.state.workPostArray.length > 0) {
      return this.state.workPostArray.map(function (currentWorkInfo, i) {
        return <WorkList workInfo={currentWorkInfo} key={i}></WorkList>;
      });
    } else {
      return <h2>Data not found</h2>;
    }
  }
  render() {
    return (
      <div>
        <h2>Work post here</h2>
        <div>{this.workPostList()}</div>
      </div>
    );
  }
}
