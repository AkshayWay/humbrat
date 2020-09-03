import React, { component, Component, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import { Redirect } from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";
import AppCSS from "../App.css";
import { Modal, Button, Form, Col, Alert } from "react-bootstrap";
import * as $ from "jquery";
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
//List of all work post
//List of features
const FeatureInfo = (props) => (
  <tr>
    <td>{props.FeatureInfo.tbl_features_title}</td>
    <td>
      <img
        src={"feature/" + props.FeatureInfo.tbl_features_file_name}
        alt={props.FeatureInfo.tbl_features_title}
        style={{
          width: 80,
          height: 60,
          display: props.FeatureInfo.tbl_features_file_name ? "inline" : "none",
        }}
      ></img>
    </td>

    <td>
      <ViewFeature variant={props.FeatureInfo} />
    </td>
    <td>
      <DeleteFeature variant={props.FeatureInfo} />
    </td>
  </tr>
);
//List of features end
const WorkPostInfo = (props) => (
  <tr>
    <td>{props.WorkPostInfo.tbl_work_title}</td>
    <td>
      <img
        src={"work/" + props.WorkPostInfo.tbl_work_images_title}
        alt={props.WorkPostInfo.tbl_work_images_title}
        style={{ width: 80, height: 60 }}
      ></img>
    </td>

    <td>
      <ViewWork variant={props.WorkPostInfo} changeDesc={props.handleChange} />
    </td>
    <td>
      <DeleteWork variant={props.WorkPostInfo} />
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
//Delete work post
function DeleteWork(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteAndClose = () => {
    axios
      .put(
        "http://localhost:4500/humbrat/WorkDetails/delete/" +
          props.variant.tbl_work_id
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
          तुम्ही नक्की '<b>{props.variant.tbl_work_title}</b>' हे छायाचित्र
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
//Delete work post end
//Delete village feature start
function DeleteFeature(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteAndClose = () => {
    const obj = {
      tbl_features_id: props.variant.tbl_features_id,
      tbl_features_title: null,
      tbl_features_description: null,
      tbl_features_is_deleted: 1,
    };
    axios
      .put(
        "http://localhost:4500/humbrat/village_features/" +
          props.variant.tbl_features_id,
        obj
      )
      .then((res) => console.log(res.data));
    setShow(false);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        काढून टाका
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>वैशिष्ठ काढून टाका</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          तुम्ही नक्की '<b>{props.variant.tbl_features_title}</b>' हे वैशिष्ठ
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
//Delete village feature end
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
//View Feature image and make changes
function ViewFeature(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [imgDescInput, setimgDescInput] = useState(
    props.variant.tbl_features_description
  );
  const [imgTitleInput, setImgTitleInput] = useState(
    props.variant.tbl_features_title
  );
  const changeDescHandler = (e) => {
    setimgDescInput(e.target.value);
  };

  const changeTitleHandler = (e) => {
    setImgTitleInput(e.target.value);
  };

  const editFeature = () => {
    const obj = {
      tbl_features_id: props.variant.tbl_features_id,
      tbl_features_title: imgTitleInput,
      tbl_features_description: imgDescInput,
      tbl_features_is_deleted: null,
    };
    axios
      .put(
        "http://localhost:4500/humbrat/village_features/" +
          props.variant.tbl_features_id,
        obj
      )
      .then((res) => console.log(res.data));
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        छायाचित्र माहिती व बदल
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>वैशिष्ठे माहिती व बदल</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <img
              src={"feature/" + props.variant.tbl_features_file_name}
              alt={props.variant.tbl_features_file_name}
              style={{ width: 100 + "%" }}
            ></img>
          </div>
          <div className="form-group">
            <label>शीर्षक</label>
            <input
              type="text"
              className="form-control"
              value={imgTitleInput}
              required
              onChange={changeTitleHandler}
            ></input>
          </div>
          <div className="form-group">
            <label>छायाचित्र माहिती</label>
            <textarea
              className="form-control"
              value={imgDescInput}
              onChange={changeDescHandler}
              rows="3"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editFeature}>
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
//Display work thumbnil and allow changes
function ViewWork(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [imgDescInput, setimgDescInput] = useState(
    props.variant.tbl_work_details
  );

  const [imgTitleInput, setimgTitleInput] = useState(
    props.variant.tbl_work_title
  );

  const dateFormat = props.variant.tbl_work_date.split("T");
  const [imgDateInput, setimgDateInput] = useState(dateFormat[0]);
  const changeImageDate = (e) => {
    setimgDateInput(e.target.value);
  };
  const changeDescHandler = (e) => {
    setimgDescInput(e.target.value);
  };
  const changeImageHandler = (e) => {
    setimgTitleInput(e.target.value);
  };
  const editWork = () => {
    const obj = {
      tbl_work_id: props.variant.tbl_work_id,
      tbl_work_title: imgTitleInput,
      tbl_work_details: imgDescInput,
      tbl_work_date: imgDateInput,
    };
    axios
      .put(
        "http://localhost:4500/humbrat/WorkDetails/add_edit/" +
          props.variant.tbl_work_id,
        obj
      )
      .then((res) => window.location.reload(true));
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        कामाची माहिती व बदल
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>कामाची माहिती व बदल</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <img
              src={"work/" + props.variant.tbl_work_images_title}
              alt={props.variant.tbl_work_images_title}
              style={{ width: 100 + "%" }}
            ></img>
          </div>
          <div className="form-group">
            <label>शीर्षक</label>
            <input
              type="text"
              className="form-control"
              value={imgTitleInput}
              onChange={changeImageHandler}
            ></input>
          </div>
          <div className="form-group">
            <label>दिनांक </label>
            <input
              type="date"
              className="form-control"
              value={imgDateInput}
              onChange={changeImageDate}
            ></input>
          </div>
          <div className="form-group">
            <label>छायाचित्र माहिती</label>
            <textarea
              className="form-control"
              value={imgDescInput}
              onChange={changeDescHandler}
              rows="3"
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editWork}>
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

    this.onBannerChange = this.onBannerChange.bind(this);
    this.onWorkDescChange = this.onWorkDescChange.bind(this);
    this.onWorkTitleChange = this.onWorkTitleChange.bind(this);
    this.onWorkDateChange = this.onWorkDateChange.bind(this);
    this.onWorkImageChange = this.onWorkImageChange.bind(this);
    this.state = {
      newsInformation: [],
      newsId: 0,
      newsTitle: "",
      newsDesp: "",
      newsCrtDate: "",
      newsIsActive: false,
      newsUpdDate: "",
      selectedFile: null,
      selectedFeatureFile: null,
      selectedFiles: "",
      bannerImgDesc: "",
      bannerImages: [],
      //  bannerIsActive: "",
      selectedBanner: "",
      instructionArr: [],
      workPostArr: [],
      featureArr: [],
      workImgDesc: "",
      workTitle: "",
      workDate: "",
      workPostImgDesc: "",
      redirect: false,
      featureTitle: "",
      featureDesc: "",
    };
  }

  async componentDidMount() {
    // alert("userEmail" + localStorage.getItem("userEmail"));
    if (
      localStorage.getItem("userEmail") != null &&
      localStorage.getItem("isLoggedIn") == 1
    ) {
      this.setState({
        //   LoggedIn: true,
        redirect: false,
      });
    } else {
      this.setState({
        //LoggedIn: false,
        redirect: true,
      });
    }
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

      const work = await axios
        .get("http://localhost:4500/humbrat/work_thumbnails")
        .then((response) => {
          this.setState({
            workPostArr: response.data,
          });
        });

      const features = await axios
        .get("http://localhost:4500/humbrat/village_features")
        .then((response) => {
          this.setState({
            featureArr: response.data,
          });
        });
      return newsPanel, bannerImage, instruction, work, features;
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
  featureList() {
    if (this.state.featureArr.length > 0) {
      return this.state.featureArr.map(function (featureInfo, i) {
        return (
          <FeatureInfo
            FeatureInfo={featureInfo}
            key={featureInfo.tbl_features_id}
          ></FeatureInfo>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan="4">माहिती उपलब्ध नाही</td>
        </tr>
      );
    }
  }
  WorkPostList() {
    //  console.log("Work before mapping", this.state.workPostArr[3].tbl_work_date);
    if (this.state.workPostArr.length > 0) {
      return this.state.workPostArr.map(function (workPostInfo, i) {
        return (
          <WorkPostInfo
            WorkPostInfo={workPostInfo}
            key={i}
            //handleChange={e}
          ></WorkPostInfo>
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
  onWorkImageUpload = (e) => {
    e.preventDefault();
    const workImgs = new FormData();
    var count = 0;
    for (const key of Object.keys(this.state.selectedFiles)) {
      workImgs.append("workImages", this.state.selectedFiles[key]);
      count++;
    }
    if (count > 10) {
      alert("Maximum 10 files allowed");
    } else {
      workImgs.append(
        "workImages",
        // this.state.selectedFiles,
        this.state.selectedFiles.name
      );
      workImgs.append("imageDesciption", this.state.workImgDesc);
      workImgs.append("workTitle", this.state.workTitle);
      workImgs.append("workDate", this.state.workDate);
      axios
        .post("http://localhost:4500/humbrat/work_details", workImgs)
        .then((res) => {
          // console.log(res);
          //setTimeout("alert('Successfully inserted')", 1000);

          this.setState({
            workTitle: "",
            workImgDesc: "",
            workDate: "",
            selectedFiles: "",
          });
          window.location.reload(true);
        });
    }
  };
  onFeatureUpload = (e) => {
    e.preventDefault();
    if (this.state.selectedFeatureFile == undefined) {
      //  console.log("File not selected");
      const featureImg = new FormData();
      featureImg.append("feature_title", this.state.featureTitle);
      featureImg.append("feature_desc", this.state.featureDesc);
      axios
        .post("http://localhost:4500/humbrat/village_features", featureImg)
        .then((res) => {
          console.log(res);
          this.setState({
            featureTitle: "",
            featureDesc: "",
            selectedFeatureFile: "",
          });
          window.location.reload(true);
        });
    } else {
      const featureImg = new FormData();
      featureImg.append(
        "featureImg",
        this.state.selectedFeatureFile,
        this.state.selectedFeatureFile.name
      );

      featureImg.append("feature_title", this.state.featureTitle);
      featureImg.append("feature_desc", this.state.featureDesc);
      axios
        .post("http://localhost:4500/humbrat/village_features", featureImg)
        .then((res) => {
          console.log(res);
          //window.location.reload(true);
          this.setState({
            featureTitle: "",
            featureDesc: "",
            selectedFeatureFile: "",
          });
        });
      window.location.reload(true);
    }
  };
  onBannerChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };
  onWorkDescChange = (e) => {
    this.setState({
      workImgDesc: e.target.value,
    });
  };
  onWorkTitleChange = (e) => {
    this.setState({
      workTitle: e.target.value,
    });
  };
  onWorkImageChange = (e) => {
    this.setState({
      //  selectedFiles: [...this.state.files, ...e.target.files],
      selectedFiles: e.target.files,
    });
  };
  onWorkDateChange = (e) => {
    this.setState({
      workDate: e.target.value,
    });
  };
  onBannerDescChange = (event) => {
    this.setState({
      bannerImgDesc: event.target.value,
    });
  };
  onFeatureTitleChange = (e) => {
    this.setState({
      featureTitle: e.target.value,
    });
  };
  onFeatureDescChange = (e) => {
    this.setState({
      featureDesc: e.target.value,
    });
  };
  onFeatureImgChange = (event) => {
    this.setState({
      selectedFeatureFile: event.target.files[0],
    });
  };
  // onActiveBannerChange = (e) => {
  //   let setValue = 0;
  //   if (this.state.bannerIsActive == 1) {
  //     setValue = 0;
  //   } else {
  //     setValue = 1;
  //   }
  //   this.setState({
  //     bannerIsActive: setValue,
  //   });
  // };

  render() {
    return (
      <div style={{ minHeight: 510 + "px" }}>
        {this.state.redirect ? <Redirect push to="/sign_in" /> : null}
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
                    value={this.state.bannerImgDesc}
                    onChange={this.onBannerDescChange}
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <Button type="submit">संक्रमित करा </Button>
            </form>
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
        <p>
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseWorkPostDiv"
            aria-expanded="false"
            aria-controls="collapseWorkPostDiv"
          >
            ग्रामपंचायत कार्य
          </button>
        </p>
        <div className="collapse show" id="collapseWorkPostDiv">
          <div className="card card-body">
            <form onSubmit={this.onWorkImageUpload}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>शीर्षक </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={this.state.workTitle}
                    onChange={this.onWorkTitleChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>दिनांक</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={this.state.workDate}
                    onChange={this.onWorkDateChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control-file"
                  id="workPostImages"
                  multiple
                  onChange={this.onWorkImageChange}
                  required
                />

                <div className="form-group">
                  <label>सविस्तर माहिती</label>
                  <textarea
                    className="form-control"
                    value={this.state.workImgDesc}
                    onChange={this.onWorkDescChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>
              <Button type="submit">संक्रमित करा </Button>
            </form>
            <div className="table-responsive">
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>माहिती</th>
                    <th>छायाचित्र</th>
                    <th colSpan="2">कृती</th>
                  </tr>
                </thead>
                <tbody>{this.WorkPostList()}</tbody>
              </table>
            </div>
          </div>
        </div>
        <p>
          <button
            className="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseFeatureDiv"
            aria-expanded="false"
            aria-controls="collapseFeatureDiv"
          >
            वैशिष्ठे
          </button>
        </p>
        <div className="collapse show" id="collapseFeatureDiv">
          <div className="card card-body">
            <form onSubmit={this.onFeatureUpload}>
              <div className="form-group">
                <label>छायाचित्र (पर्यायी)</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="featureImageUpload"
                  onChange={this.onFeatureImgChange}
                />
                <div className="form-group">
                  <label>शीर्षक </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={this.state.featureTitle}
                    onChange={this.onFeatureTitleChange}
                  />
                </div>
                <div className="form-group">
                  <label>माहिती</label>
                  <textarea
                    className="form-control"
                    value={this.state.featureDesc}
                    onChange={this.onFeatureDescChange}
                    rows="3"
                    required
                  ></textarea>
                </div>
              </div>
              <Button type="submit">संक्रमित करा </Button>
            </form>
            <div className="table-responsive">
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th>शीर्षक</th>
                    <th>छायाचित्र</th>
                    <th colSpan="2">कृती</th>
                  </tr>
                </thead>
                <tbody>{this.featureList()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
