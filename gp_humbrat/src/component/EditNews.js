import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";
import { Modal, Button, Form, Col } from "react-bootstrap";

export default class EditNews extends Component {
  constructor(props) {
    super(props);

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChane = this.onDescriptionChane.bind(this);
    //  this.onCreateDateChange = this.onCreateDateChange.bind(this);
    //  this.onUpdatedDateChange = this.onUpdatedDateChange.bind(this);
    this.onNewsActiveChange = this.onNewsActiveChange.bind(this);
    this.state = {
      newsID: 0,
      newsTitle: "",
      newsDescp: "",
      newsCreated: "",
      newsIsActive: false,
      newsUpdate: "",
      newsIsDeleted: "",
    };
  }

  onTitleChange(e) {
    this.setState({
      newsTitle: e.target.value,
    });
  }
  onDescriptionChane(e) {
    this.setState({
      newsDescp: e.target.value,
    });
  }
  // onCreateDateChange(e) {
  //   this.setState({
  //     newsCreated: e.target.value,
  //   });
  // }
  // onUpdatedDateChange(e) {
  //   this.setState({
  //     newsUpdate: e.target.value,
  //   });
  // }
  onNewsActiveChange(e) {
    this.setState({
      newsIsActive: e.target.checked,
    });
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:4500/humbrat/news_panel/" + this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          //newsInformation: response.data,
          newsID: response.data[0].tbl_news_id,
          newsTitle: response.data[0].tbl_news_title,
          newsDescp: response.data[0].tbl_news_desciption,
          newsCreated: response.data[0].tbl_news_created_date,
          newsUpdate: response.data[0].tbl_news_updated_date,
          newsIsActive: response.data[0].tbl_news_is_active,
        });
        var formatCreatedDate = this.state.newsCreated.split("T");
        var formatUpdatedDate = this.state.newsUpdate.split("T");
        this.setState({
          newsCreated: formatCreatedDate[0],
          newsUpdate: formatUpdatedDate[0],
        });
        console.log("Formatted date:" + this.state.newsUpdate);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      tbl_news_id: this.state.newsID,
      tbl_news_title: this.state.newsTitle,
      tbl_news_desciption: this.state.newsDescp,
      tbl_news_is_active: this.state.newsIsActive,
    };
    axios
      .post(
        "http://localhost:4500/humbrat/news_panel/addEdit/" +
          this.props.match.params.id,
        obj
      )
      .then((res) => {
        console.log("Successfully Inserted/Updated");
        this.props.history.push("/adminPortal");
      })
      .catch(function (error) {
        console.log("Error : " + error);
      });
  };
  render() {
    return (
      <div>
        <h1>माहिती बदल</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formNewsIsActive">
              <Form.Check
                type="checkbox"
                label="सक्रिय आहे"
                checked={this.state.newsIsActive}
                onChange={this.onNewsActiveChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupNewsTitle">
              <Form.Label>शीर्षक</Form.Label>
              <Form.Control
                type="text"
                value={this.state.newsTitle}
                onChange={this.onTitleChange}
                placeholder="शीर्षक"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupNewsDescription">
              <Form.Label>सविस्तर माहिती</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.newsDescp}
                onChange={this.onDescriptionChane}
                placeholder="सविस्तर माहिती"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formNewsCrtDate">
              <Form.Label>दिनांक</Form.Label>
              <Form.Control
                type="date"
                value={this.state.newsCreated}
                //onChange={this.onCreateDateChange}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formNewsUpdateDate">
              <Form.Label>शेवटची बदलाची तारीख</Form.Label>
              <Form.Control
                type="date"
                value={this.state.newsUpdate}
                disabled
                //onChange={this.onUpdatedDateChange}
              />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" value="Edit news" type="submit">
            जतन करा
          </Button>
        </Form>
      </div>
    );
  }
}
