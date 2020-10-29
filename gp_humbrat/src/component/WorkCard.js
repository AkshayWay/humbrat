import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class WorkCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let today = new Date(this.props.workPost.tbl_work_date);
    let day = ("0" + parseInt(today.getDate())).slice(-2);
    let month = ("0" + parseInt(today.getMonth() + 1)).slice(-2);
    let date = day + "-" + month + "-" + today.getFullYear();
    return (
      <div className="card" style={{ border: "solid #34ebe8" }}>
        <img
          className="card-img-top"
          src={"work/" + this.props.workPost.tbl_work_images_title}
          alt="work image"
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.workPost.tbl_work_title}</h5>
          <Link
            to={"/WorkDetails/" + this.props.workPost.tbl_work_id}
            className="nav-link"
          >
            सविस्तर माहिती
          </Link>
          <p className="card-text">
            <small className="text-muted">{date}</small>
          </p>
        </div>
      </div>
    );
  }
}
