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
import { store } from "react-notifications-component";

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
      datesDisplay: "inherit",
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
  onNewsActiveChange(e) {
    this.setState({
      newsIsActive: e.target.checked,
    });
  }
  componentDidMount() {
    if (this.props.match.params.id != 0) {
      axios
        .get(
          "http://localhost:4500/humbrat/news_panel/" +
            this.props.match.params.id
        )
        .then((response) => {
          this.setState({
            //newsInformation: response.data,
            newsID: response.data[0].tbl_news_id,
            newsTitle: response.data[0].tbl_news_title,
            newsDescp: response.data[0].tbl_news_description,
            newsCreated: response.data[0].tbl_news_created_date,
            newsUpdate: response.data[0].tbl_news_updated_date,
            newsIsActive: response.data[0].tbl_news_is_active,
          });
          //console.log("News desc: ", this.state.newsDescp);
          var formatCreatedDate = this.state.newsCreated.split("T");
          var formatUpdatedDate = this.state.newsUpdate.split("T");
          this.setState({
            newsCreated: formatCreatedDate[0],
            newsUpdate: formatUpdatedDate[0],
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      this.setState({
        datesDisplay: "none",
      });
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      tbl_news_id: this.state.newsID,
      tbl_news_title: this.state.newsTitle,
      tbl_news_description: this.state.newsDescp,
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
        store.addNotification({
          title: "बातमी",
          message: "बातमी जतन करण्यात आले आहे",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 4000,
            onScreen: true,
            showIcon: true,
          },
          width: 600,
        });
        this.props.history.push("/adminPortal");
      })
      .catch(function (error) {
        console.log("Error : " + error);
      });
  };
  render() {
    return (
      <div style={{ minHeight: "calc(100vh - 70px)" }}>
        <h2 style={{ margin: "20px" }}>बातमी</h2>
        <hr
          style={{
            height: "10px",
            borderWidth: "0",
            boxShadow: " 0 10px 10px -10px #8c8c8c inset",
            backgroundImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(60, 179, 113), rgba(0, 0, 0, 0))",
          }}
        ></hr>
        <Form
          onSubmit={this.onSubmit}
          style={{ width: "70%", margin: "0 auto" }}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="formNewsIsActive">
              <Form.Label>सक्रिय आहे</Form.Label>
              <Form.Check
                type="checkbox"
                //  label="सक्रिय आहे"
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
                //  placeholder="शीर्षक"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGroupNewsDescription">
              <Form.Label>सविस्तर बातमी </Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                value={this.state.newsDescp}
                onChange={this.onDescriptionChane}
                // placeholder="सविस्तर माहिती"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row style={{ display: this.state.datesDisplay }}>
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
          <div className="text-center">
            <Button variant="primary" value="Edit news" type="submit">
              जतन करा
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
