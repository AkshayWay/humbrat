import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import Moment from "react-moment";
import axios from "axios";
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
        className="glyphicon glyphicon-pencil"
        to={"/editNews/" + props.NewsInfo.tbl_news_id}
      >
        Edit
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
        "http://localhost:4000/expensemanagerdb/delete/" + props.variant._id
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
    return this.state.newsInformation.map(function (currentNewsInfo, i) {
      return <NewsList NewsInfo={currentNewsInfo} key={i}></NewsList>;
    });
  }

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
            <Link
              type="button"
              className="btn btn-outline-primary"
              to={"/editNews/0"}
            >
              नवीन सूचना
            </Link>
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
                </tr>
              </thead>
              <tbody>{this.NewsAlertList()}</tbody>
            </table>

            {/* <form>
              <div className="form-group">
                <label for="newsTitle">शीर्षक</label>
                <input
                  type="text"
                  className="form-control"
                  id="newsTitle"
                  placeholder="शीर्षक"
                  value={this.state.newsTitle}
                />
              </div> 
              <div className="form-group">
                <label for="exampleFormControlSelect1">Example select</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label for="exampleFormControlSelect2">
                  Example multiple select
                </label>
                <select
                  multiple
                  className="form-control"
                  id="exampleFormControlSelect2"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label for="exampleFormControlTextarea1">
                  Example textarea
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div> 
            </form>*/}
          </div>
        </div>
      </div>
    );
  }
}
