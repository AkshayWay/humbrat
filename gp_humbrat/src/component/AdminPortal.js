import React, { component, Component, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";
import AppCSS from "../App.css";
import { Modal, Button, Form, Col, Alert } from "react-bootstrap";

const NewsList = (props) => (
  <tr>
    <td>{props.NewsInfo.tbl_news_id}</td>
    <td>{props.NewsInfo.tbl_news_title}</td>
    <td>{props.NewsInfo.tbl_news_desciption}</td>
    <td>
      <Moment format="DD/MM/YYYY">
        {props.NewsInfo.tbl_news_created_date}
      </Moment>
    </td>
    <td>
      <input
        type="checkbox"
        value={props.NewsInfo.tbl_news_is_active}
        name="active_news"
        readOnly
        checked={props.NewsInfo.tbl_news_is_active == 1 ? true : false}
      />
    </td>
    <td>
      <Moment format="DD/MM/YYYY">
        {props.NewsInfo.tbl_news_updated_date}
      </Moment>
    </td>
    <td>{props.NewsInfo.tbl_news_is_deleted}</td>

    <td>
      <Link
        className="btn btn-primary"
        to={"/editNews/" + props.NewsInfo.tbl_news_id}
      >
        बातमी बदल
      </Link>
    </td>
    <td>
      <DeleteNewsInfo variant={props.NewsInfo} />
    </td>
  </tr>
);

const BannerInfo = (props) => (
  <tr
    className={
      props.BannerInfo.tbl_banner_is_active == 1 ? "table-success" : "null"
    }
  >
    <td>{props.BannerInfo.tbl_banner_img_desc}</td>
    <td>
      <img
        src={"uploads/" + props.BannerInfo.tbl_banner_title}
        alt={props.BannerInfo.tbl_banner_title}
        style={{ width: 80, height: 60 }}
      ></img>
    </td>

    <td>
      <ViewBanner variant={props.BannerInfo} changeDesc={props.handleChange} />
    </td>
    <td>
      <DeleteBanner variant={props.BannerInfo} />
    </td>
  </tr>
);
//List of all instructions
const Instruction = (props) => (
  <tr
    className={
      props.instructionInfo.tbl_instructions_is_active == 1
        ? "table-success"
        : "null"
    }
  >
    <td>{props.instructionInfo.tbl_instructions_msg}</td>
    <td>
      {" "}
      <Link
        className="btn btn-primary"
        to={"/instruction/" + props.instructionInfo.tbl_instructions_id}
      >
        माहिती बदल
      </Link>
    </td>
    <td>
      <DeleteInstructionInfo variant={props.instructionInfo} />
    </td>
  </tr>
);

//List of all instructions end
//Delete banner info
function DeleteBanner(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteAndClose = () => {
    axios
      .put(
        "http://localhost:4500/humbrat/dashboard_banner/delete/" +
          props.variant.tbl_banner_id
      )
      .then((res) => console.log(res.data), window.location.reload(true));
    //.then((res) => console.log(res.data));
    setShow(false);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        काढून टाका
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>छायाचित्र काढून टाका</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          तुम्ही नक्की '<b>{props.variant.tbl_banner_img_desc}</b>' हे छायाचित्र
          काढून टाकू इच्चीता?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteAndClose}>
            काढून टाका
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            बंद करा
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
//Delete banner info end
//View Banner Image and make changes
function ViewBanner(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [imgDescInput, setimgDescInput] = useState(
    props.variant.tbl_banner_img_desc
  );
  var isActiveChecked = props.variant.tbl_banner_is_active == 1 ? true : false;
  const [imgIsActiveInput, setimgIsActiveInput] = useState(isActiveChecked);
  //props.variant.bannerImgDesc = props.variant.tbl_banner_img_desc;

  const changeDescHandler = (e) => {
    setimgDescInput(e.target.value);
  };
  const changeIsActiveHandler = (e) => {
    setimgIsActiveInput(e.target.checked);
  };
  const editBanner = () => {
    const obj = {
      tbl_banner_id: props.variant.tbl_banner_id,
      tbl_banner_is_active: imgIsActiveInput,
      tbl_banner_img_desc: imgDescInput,
    };
    axios
      .put(
        "http://localhost:4500/humbrat/dashboard_banner/edit/" +
          props.variant.tbl_banner_id,
        obj
      )
      .then((res) => console.log(res.data), window.location.reload(true));
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        छायाचित्र माहिती व बदल
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>छायाचित्र माहिती व बदल</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <img
              src={"uploads/" + props.variant.tbl_banner_title}
              alt={props.variant.tbl_banner_title}
              style={{ width: 100 + "%" }}
            ></img>
          </div>
          <div className="form-group">
            <input
              type="checkbox"
              checked={imgIsActiveInput}
              onChange={changeIsActiveHandler}
            ></input>
            <label> : सक्रिय आहे </label>
          </div>
          <div className="form-group">
            <label>छायाचित्र माहिती</label>
            <textarea
              className="form-control"
              id="imageDescription"
              value={imgDescInput}
              onChange={changeDescHandler}
              rows="3"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editBanner}>
            माहिती बदल
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            बंद करा
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
function DeleteNewsInfo(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteAndClose = () => {
    console.log("delete id: " + props.variant.tbl_news_id);
    axios
      .post(
        "http://localhost:4500/humbrat/news_panel/delete/" +
          props.variant.tbl_news_id
      )
      .then((res) => console.log(res.data), window.location.reload(true));
    setShow(false);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        काढून टाका
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>बातमी काढून टाका</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          तुम्ही नक्की '<b>{props.variant.tbl_news_title}</b>' हि बातमी काढून
          टाकू इच्चीता?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteAndClose}>
            काढून टाका
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            बंद करा
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DeleteInstructionInfo(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteAndClose = () => {
    console.log("delete id: " + props.variant.tbl_instructions_id);
    axios
      .put(
        "http://localhost:4500/humbrat/instructions/delete/" +
          props.variant.tbl_instructions_id
      )
      .then((res) => console.log(res.data), window.location.reload(true));
    setShow(false);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        काढून टाका
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>सूचना काढून टाका</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          तुम्ही नक्की '<b>{props.variant.tbl_instructions_msg}</b>' हि सूचना
          काढून टाकू इच्चीता?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteAndClose}>
            काढून टाका
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            बंद करा
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default class AdminPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsInformation: [],
      newsId: 0,
      newsTitle: "",
      newsDesp: "",
      newsCrtDate: "",
      newsIsActive: false,
      newsUpdDate: "",
      selectedFile: null,
      bannerImgDesc: "",
      bannerImages: [],
      bannerIsActive: "",
      selectedBanner: "",
      instructionArr: [],
    };
  }

  async componentDidMount() {
    try {
      const newsPanel = await axios
        .get("http://localhost:4500/humbrat/news_panel")
        .then((response) => {
          this.setState({
            newsInformation: response.data,
          });
        });

      const bannerImage = await axios
        .get("http://localhost:4500/humbrat/dashboard_banner/all_img")
        .then((response) => {
          this.setState({
            bannerImages: response.data,
          });
        });

      const instruction = await axios
        .get("http://localhost:4500/humbrat/instructions")
        .then((response) => {
          this.setState({
            instructionArr: response.data,
          });
        });

      return newsPanel, bannerImage, instruction;
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  NewsAlertList() {
    if (this.state.newsInformation.length > 0) {
      return this.state.newsInformation.map(function (currentNewsInfo, i) {
        return <NewsList NewsInfo={currentNewsInfo} key={i}></NewsList>;
      });
    } else {
      return (
        <tr>
          <td colSpan="8">माहिती उपलब्ध नाही</td>
        </tr>
      );
    }
  }

  bannerList(e) {
    if (this.state.bannerImages.length > 0) {
      return this.state.bannerImages.map(function (bannerInfo, i) {
        return (
          <BannerInfo
            BannerInfo={bannerInfo}
            key={i}
            handleChange={e}
          ></BannerInfo>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan="5">माहिती उपलब्ध नाही</td>
        </tr>
      );
    }
  }

  instructionList() {
    if (this.state.instructionArr.length > 0) {
      return this.state.instructionArr.map(function (instructionInfo, i) {
        return (
          <Instruction instructionInfo={instructionInfo} key={i}></Instruction>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan="5">माहिती उपलब्ध नाही</td>
        </tr>
      );
    }
  }
  onBannerUpload = (e) => {
    e.preventDefault();
    const bannerImg = new FormData();
    bannerImg.append(
      "bannerImg",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    bannerImg.append("imageDesciption", this.state.bannerImgDesc);

    axios
      .post("http://localhost:4500/humbrat/dashboard_banner", bannerImg)
      .then((res) => {
        console.log(res);
        window.location.reload(true);
      });
  };
  onBannerChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  onBannerDescChange = (event) => {
    this.setState({
      bannerImgDesc: event.target.value,
    });
  };
  onActiveBannerChange = (e) => {
    let setValue = 0;
    if (this.state.bannerIsActive == 1) {
      setValue = 0;
    } else {
      setValue = 1;
    }
    this.setState({
      bannerIsActive: setValue,
    });
    alert("Change " + this.state.bannerIsActive);
  };

  render() {
    return (
      <div>
        <h1>प्रशासक</h1>

        <p>
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseNewsDiv"
            aria-expanded="false"
            aria-controls="collapseNewsDiv"
          >
            बातम्या
          </button>
        </p>
        <div className="collapse show" id="collapseNewsDiv">
          <div className="card card-body">
            <p>
              <Link
                type="button"
                className="btn btn-outline-primary"
                to={"/editNews/0"}
              >
                नवीन बातमी
              </Link>
            </p>
            <div className="table-responsive">
              <table
                className="table table-striped"
                style={{ marginTop: 20 }}
                id="SelectListExcel"
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>शीर्षक</th>
                    <th>सविस्तर माहिती</th>
                    <th>दिनांक</th>
                    <th>सक्रिय आहे</th>
                    <th>शेवटची बदलाची तारीख</th>
                    <th>अस्तित्वात</th>
                    <th colSpan="2">कृती</th>
                  </tr>
                </thead>
                <tbody>{this.NewsAlertList()}</tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dashboard banner*/}

        <p>
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseBannerDiv"
            aria-expanded="false"
            aria-controls="collapseBannerDiv"
          >
            मुख्य पृष्ठ छायाचित्र
          </button>
        </p>
        <div className="collapse show" id="collapseBannerDiv">
          <div className="card card-body">
            <form onSubmit={this.onBannerUpload}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control-file"
                  id="bannerImageUpload"
                  onChange={this.onBannerChange}
                  required
                />

                <div className="form-group">
                  <label>छायाचित्र माहिती</label>
                  <textarea
                    className="form-control"
                    id="imageDescription"
                    value={this.state.bannerImgDesc}
                    onChange={this.onBannerDescChange}
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <Button type="submit">संक्रमित करा </Button>
            </form>
            {/* <img src="uploads/2020-07-30T15-34-36.338Z-road_inauguration.jpeg" /> */}
            <div className="table-responsive">
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>माहिती</th>
                    <th>छायाचित्र</th>
                    {/* <th>सक्रिय आहे</th> */}
                    <th colSpan="2">कृती</th>
                  </tr>
                </thead>
                {/* <tbody>{this.bannerList()}</tbody> */}
                <tbody>{this.bannerList(this.onBannerDescChange)}</tbody>
              </table>
            </div>
          </div>
        </div>

        <p>
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseInstructionDiv"
            aria-expanded="false"
            aria-controls="collapseInstructionDiv"
          >
            सूचना
          </button>
        </p>

        <div className="collapse show" id="collapseInstructionDiv">
          <div className="card card-body">
            <p>
              <Link
                type="button"
                className="btn btn-outline-primary"
                to={"/instruction/0"}
              >
                नवीन सूचना
              </Link>
            </p>
            <div className="table-responsive">
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>सूचना</th>
                    <th colSpan="2">कृती</th>
                  </tr>
                </thead>
                <tbody>{this.instructionList()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
