import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class WorkCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let today = new Date(this.props.workPost.tbl_work_date);
    let day = ("0" + parseInt(today.getDate() + 1)).slice(-2);
    let month = ("0" + parseInt(today.getMonth() + 1)).slice(-2);
    let date = day + "-" + month + "-" + today.getFullYear();
    console.log(date);

    //const NewDate = moment(this.props.workPost.tbl_work_date, "DD-MM-YYYY");
    // console.log("Inside work card", NewDate);
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={"work/" + this.props.workPost.tbl_work_images_title}
          alt="work image"
        />
        <div className="card-body">
          <h5 className="card-title">{this.props.workPost.tbl_work_title}</h5>
          <Link to="/WorkDetails" className="nav-link">
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
