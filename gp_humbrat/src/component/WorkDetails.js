import axios from "axios";
import React, { Component } from "react";
import WorkSlider from "./WorkSlider";
import { Carousel } from "react-bootstrap";
import "../App.css";
import { Prev } from "react-bootstrap/esm/PageItem";

export default class WorkDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workImageArr: [],
      workImageStrng: "",
      workTitle: "",
      workDate: "",
      workDetails: "",
    };
  }

  componentDidMount() {
    console.log("  this.props.match.params.id:", this.props.match.params.id);
    if (this.props.match.params.id != 0) {
      axios
        .get(
          "http://localhost:4500/humbrat/WorkDetails/" +
            this.props.match.params.id
        )
        .then((response) => {
          this.setState({
            workImageStrng: response.data[0].tbl_work_images_title,
            workTitle: response.data[0].tbl_work_title,
            workDate: response.data[0].tbl_work_date,
            workDetails: response.data[0].tbl_work_details,
          });
          //  var formatCreatedDate = this.state.workDate.split("T");
          var formatCreatedDate = new Date(this.state.workDate);
          var isoDate = new Date(formatCreatedDate.toUTCString().slice(0, -4));
          isoDate.setDate(isoDate.getDate() + parseInt(1));
          var dd = isoDate.getDate();
          var mm = isoDate.getMonth() + 1;
          var yyyy = isoDate.getFullYear();
          if (dd < 10) {
            dd = "0" + dd;
          }
          if (mm < 10) {
            mm = "0" + mm;
          }
          var d = dd + "/" + mm + "/" + yyyy;
          var imageArray = this.state.workImageStrng.split(",");
          this.setState({
            workDate: d,
            workImageArr: imageArray,
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

  render() {
    let ImageSlider = this.state.workImageArr.map(function (workImages, i) {
      return <WorkSlider workImages={workImages} key={i} />;
    });
    return (
      <div>
        <div id="work_div">
          <div
            id="ImageSlider"
            className="rounded mx-auto d-block card mb-3 shadow-sm p-3 mb-5 bg-light rounded"
            style={{
              width: "80%",
              paddingTop: "20px",
              margin: "20px",
            }}
          >
            <Carousel>
              {this.state.workImageArr.map((images) => (
                <Carousel.Item>
                  {/* <div className="center-block"> */}
                  <img
                    className="d-block w-100"
                    src={"/work/" + images}
                    alt={images}
                    style={{
                      height: "100%",
                    }}
                  />
                  {/* </div> */}
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          <form style={{ margin: "20px" }}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <p>
                  <label>
                    <b>शीर्षक</b>
                  </label>
                  <br />
                  {this.state.workTitle}
                </p>
              </div>
              <div className="form-group col-md-6">
                <label>
                  <b>दिनांक</b>
                </label>
                <br />
                {this.state.workDate}
              </div>
            </div>
            <p style={{ whiteSpace: "pre-line" }}>
              <label>
                <b>सविस्तर माहिती</b>
              </label>
              <br />
              {this.state.workDetails}
            </p>
          </form>
        </div>
      </div>
    );
  }
}
