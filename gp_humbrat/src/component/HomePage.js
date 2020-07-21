import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import gp_banner from "../assets/images/gp_banner.jpg";
import gp_population from "../assets/images/gp_population.png";
import gp_connectivity from "../assets/images/gp_connectivity.png";
import gp_literacy from "../assets/images/gp_literacy.png";
import AppCSS from "../App.css";
import axios from "axios";
import Moment from "react-moment";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsTitle: "",
      newsDesc: "",
      newsLastUpdate: "",
      newsAvailable: "none",
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:4500/humbrat/home/news_panel")
      .then((response) => {
        console.log("Length of data: ", response.data.length);
        if (response.data.length > 0) {
          this.setState({
            newsAvailable: "block",
            newsTitle: response.data[0].tbl_news_title,
            newsDesc: response.data[0].tbl_news_description,
            newsLastUpdate: response.data[0].tbl_news_updated_date,
          });
        } else {
          this.setState({
            newsAvailable: "none",
          });
        }
      })
      .catch(function (err) {
        console.log("Error: " + err);
      });
  }
  render() {
    const marginBottom = {
      marginBottom: "25px",
    };
    var newsDate = this.state.newsLastUpdate;

    return (
      <div>
        <div>
          <img
            src={gp_banner}
            className="img-fluid rounded rounded shadow p-3 mb-5 bg-white rounded"
            alt="Responsive image"
          />
        </div>

        <marquee scrollamount="7">
          साबणानी हाथ धुवा, जीवनातून रोग मिटवा | सतत धुवूया 2० सेकंद हात
          कोरोनाचा होईल त्यामुळे घात | ठेवूया 1 मीटर सुरक्षित अंतर कोरोना होवूदे
          छूमंतर
        </marquee>
        <div
          className="card mb-3 shadow-sm p-3 mb-5 bg-white rounded"
          style={{ maxWidth: 100 + "%", display: this.state.newsAvailable }}
        >
          <div className="row no-gutters">
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title">{this.state.newsTitle}</h5>
                <p className="card-text">{this.state.newsDesc}</p>
                <p className="card-text">
                  <small className="text-muted">
                    <Moment format="DD/MM/YYYY">{newsDate}</Moment>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-deck">
          <div className="card" style={marginBottom}>
            <img src={gp_population} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">लोकसंख्या</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card" style={marginBottom}>
            <img src={gp_literacy} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">साक्षरता</h5>
              <p className="card-text">
                This card has supporting text below as a natural lead-in to
                additional content.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card" style={marginBottom}>
            <img src={gp_connectivity} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">भौगोलिक स्थान</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
        <div className="card-deck">
          <div className="card" style={marginBottom}>
            <img src={gp_population} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">बचतगट</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card" style={marginBottom}>
            <img src={gp_literacy} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">शाळा</h5>
              <p className="card-text">
                This card has supporting text below as a natural lead-in to
                additional content.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card" style={marginBottom}>
            <img src={gp_connectivity} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">भौगोलिक स्थान</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
