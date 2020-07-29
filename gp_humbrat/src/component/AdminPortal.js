import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";
import AppCSS from "../App.css";
import { Modal, Button, Form, Col } from "react-bootstrap";

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
        माहिती बदल
      </Link>
    </td>
    <td>
      <DeleteNewsInfo variant={props.NewsInfo} />
    </td>
  </tr>
);

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
          <Modal.Title>सूचना काढून टाका</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          तुम्ही नक्की '<b>{props.variant.tbl_news_title}</b>' हि सूचना काढून
          टाकू इच्चीता?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            बंद करा
          </Button>
          <Button variant="primary" onClick={deleteAndClose}>
            काढून टाका
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
// function EditNews(props) {
// const [show, setShow] = React.useState(false);

// const handleClose = () => setShow(false);
// const handleShow = () => setShow(true);

//   return (
//     <>
// <Button variant="primary" onClick={handleShow}>
//   Launch demo modal
// </Button>

// <Modal show={show} onHide={handleClose}>
//   <Modal.Header closeButton>
//     <Modal.Title>Modal heading</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <label></label>
// <Form>
//   <Form.Row>
//     <Form.Group as={Col} controlId="formGroupNewsTitle">
//       <Form.Label>शीर्षक</Form.Label>
//       <Form.Control
//         type="text"
//         value={props.variant.tbl_news_title}
//         // onChange={this.onNameChange}
//         placeholder="शीर्षक"
//       />
//     </Form.Group>
//     <Form.Group as={Col} controlId="formGroupNewsDescription">
//       <Form.Label>सविस्तर माहिती</Form.Label>
//       <Form.Control
//         as="textarea"
//         rows="3"
//         value={props.variant.tbl_news_desciption}
//         // onChange={this.onDescriptionChane}
//         placeholder="सविस्तर माहिती"
//       />
//     </Form.Group>
//   </Form.Row>
//   <Form.Row>
//     <Form.Group as={Col} controlId="formNewsCrtDate">
//       <Form.Label>Date</Form.Label>
//       <Form.Control
//         type="date"
//         value={props.variant.tbl_news_created_date}
//         // onChange={this.onDateChange}
//       />
//     </Form.Group>
//     <Form.Group as={Col} controlId="formNewsUpdateDate">
//       <Form.Label>Date</Form.Label>
//       <Form.Control
//         type="date"
//         value={props.variant.tbl_news_updated_date}
//         // onChange={this.onDateChange}
//       />
//     </Form.Group>
//   </Form.Row>

//   <Button variant="primary" value="Edit news" type="submit">
//     Submit
//   </Button>
// </Form>
//   </Modal.Body>
//   <Modal.Footer>
//     <Button variant="secondary" onClick={handleClose}>
//       Close
//     </Button>
//     <Button variant="primary" onClick={handleClose}>
//       Save Changes
//     </Button>
//   </Modal.Footer>
// </Modal>
//     </>
//   );
// }
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
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4500/humbrat/news_panel")
      .then((response) => {
        this.setState({
          newsInformation: response.data,
        });
      })
      .catch(function (err) {
        console.log("Error: " + err);
      });
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
  onBannerUpload = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
    console.log("fd:", this.state.selectedFile);
    axios
      .post("http://localhost:4500/humbrat/dashboard_banner", fd)
      .then((res) => {
        console.log(res);
      });
  };
  onBannerChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
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
            सूचना
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
                नवीन सूचना
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
                  id="exampleFormControlFile1"
                  onChange={this.onBannerChange}
                />
              </div>
              <Button type="submit">संक्रमित करा </Button>
            </form>
            {/* <div className="table-responsive">
              <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                  <tr>
                    <th></th>
                    <th>शीर्षक</th>
                    <th>छायाचित्र</th>
                    <th>सक्रिय आहे</th>
                    <th colSpan="2">कृती</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
    */}
          </div>
        </div>
      </div>
    );
  }
}
