import axios from "axios";
import React, { Component } from "react";
import WorkSlider from "./WorkSlider";
import { Carousel } from "react-bootstrap";

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
          console.log(response);
          this.setState({
            workImageStrng: response.data[0].tbl_work_images_title,
            workTitle: response.data[0].tbl_work_title,
            workDate: response.data[0].tbl_work_date,
            workDetails: response.data[0].tbl_work_details,
          });
          var formatCreatedDate = this.state.workDate.split("T");
          var imageArray = this.state.workImageStrng.split(",");
          this.setState({
            workDate: formatCreatedDate[0],
            workImageArr: imageArray,
          });
          //   console.log("Iamge array", this.state.workImageArr);
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
        <h2>Work Details</h2>
        <div id="work_div">
          <div id="ImageSlider">
            <Carousel>
              {this.state.workImageArr.map((images) => (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={"/work/" + images}
                    alt={images}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
          {/* <div
            id="carouselExampleInterval"
            className="carousel slide"
            data-ride="carousel"
          >
          <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/work/2020-08-12T18-21-20.858Z-Bandhara_Bandhani_1.jpeg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item ">
                <img
                  src="/work/2020-08-12T18-40-29.133Z-road_inauguration.jpeg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/work/2020-08-12T18-40-29.133Z-road_inauguration.jpeg"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          <a
              className="carousel-control-prev"
              href="#carouselExampleInterval"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleInterval"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div> */}
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                {/* <label>शीर्षक</label>
                <input
                  type="text"
                  className="form-control"
                  readOnly
                  value={this.state.workTitle}
                /> */}
                <p>
                  <label>
                    <b>शीर्षक</b>
                  </label>
                  <br />
                  {this.state.workTitle}
                </p>
              </div>
              <div className="form-group col-md-6">
                {/* <label>दिनांक</label>
                <input
                  type="date"
                  className="form-control"
                  readOnly
                  value={this.state.workDate}
                /> */}
                <label>
                  <b>दिनांक</b>
                </label>
                <br />
                {this.state.workDate}
              </div>
            </div>
            {/* <div className="form-group">
              <label>सविस्तर माहिती</label>
              <textarea
                type="text"
                row="4"
                className="form-control"
                readOnly
                value={this.state.workTitle}
              />
            </div> */}
            <p>
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
