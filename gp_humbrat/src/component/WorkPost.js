import React, { component, Component } from "react";
import axios from "axios";
import { Card, CardDeck, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
  // Row,
  // Container,
} from "react-router-dom";
//import { Container, Row } from "reactstrap";
import WorkCard from "./WorkCard";

var countRow = 0;
const WorkList = (props) => (
  <Card>
    <Card.Img
      variant="top"
      src={"work/" + props.workInfo.tbl_work_images_title}
      className="img-thumbnail"
    />

    <Card.Body>
      <Card.Title>{props.workInfo.tbl_work_images_title}</Card.Title>
      <Card.Text>
        {props.workInfo.tbl_work_images_title}
        <Link to="/WorkDetails" className="nav-link">
          सविस्तर माहिती
        </Link>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">{props.workInfo.tbl_work_date}</small>
    </Card.Footer>
  </Card>
);
//   <Card>
//     <Card.Img variant="top" src="holder.js/100px160" />
//     <Card.Body>
//       <Card.Title>Card title</Card.Title>
//       <Card.Text>
//         This card has supporting text below as a natural lead-in to additional
//         content.{" "}
//       </Card.Text>
//     </Card.Body>
//     <Card.Footer>
//       <small className="text-muted">Last updated 3 mins ago</small>
//     </Card.Footer>
//   </Card>
//   <Card>
//     <Card.Img variant="top" src="holder.js/100px160" />
//     <Card.Body>
//       <Card.Title>Card title</Card.Title>
//       <Card.Text>
//         This is a wider card with supporting text below as a natural lead-in
//         to additional content. This card has even longer content than the
//         first to show that equal height action.
//       </Card.Text>
//     </Card.Body>
//     <Card.Footer>
//       <small className="text-muted">Last updated 3 mins ago</small>
//     </Card.Footer>
//   </Card>
//</CardDeck>

export default class WorkPost extends Component {
  constructor(props) {
    super(props);
    this.workPostList = this.workPostList.bind(this);
    this.state = {
      workPostArray: [],
      countPost: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4500/humbrat/work_thumbnails")
      .then((response) => {
        this.setState({
          workPostArray: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  workPostList() {
    // e.preventDefault();
    if (this.state.workPostArray.length > 0) {
      //alert("Length:" + this.state.workPostArray.length);
      console.log("Workpost array outside:", this.state.workPostArray);

      var result = "";
      for (var i = 0; i < this.state.workPostArray.length; i++) {
        //console.log(this.state.workPostArray[i].tbl_work_title);
        // var countRow = 1;
        //  for(var j=0)
        //   result += "<CardDeck>";
        //   for (var j = 0; j < 3; j++) {
        //     result += "<Card>";
        //     result += "<Card.Img";
        //     result += "variant='top'";
        //     result +=
        //       "src={'work/' + " +
        //       this.state.workPostArray[i].tbl_work_images_title +
        //       "}";
        //     result += "className='img-thumbnail'";
        //     result += "/>";

        //     result += "<Card.Body>";
        //     result +=
        //       "<Card.Title>" +
        //       this.state.workPostArray[i].tbl_work_images_title +
        //       "</Card.Title>";
        //     result += "<Card.Text>";
        //     // result += this.sate.workPostArray[i].tbl_work_images_title;
        //     result += "<Link to='/WorkDetails' className='nav-link'>";
        //     result += "सविस्तर माहिती";
        //     result += "</Link>";
        //     result += "</Card.Text>";
        //     result += "</Card.Body>";
        //     result += "<Card.Footer>";
        //     result +=
        //       "<small className='text-muted'>" +
        //       this.state.workPostArray[i].tbl_work_date +
        //       "</small>";
        //     result += "</Card.Footer>";
        //     result += " </Card>";
        //     i = i + 1;
        //   }

        //   result += "</CardDeck>";
        // }
        // console.log("checking data", result);
        // document.getElementById("postDiv").innerHTML = result;
        return this.state.workPostArray.map(function (currentWorkInfo, i) {
          //   alert("Count :" + this.state.countPost);
          //   //alert("i:" + i);
          //   // return i %  == 0 ? (
          //   //   <CardDeck>
          return <WorkList workInfo={currentWorkInfo} key={i} />;
          //   //   </CardDeck>
          // ) : (
          //   <WorkList workInfo={currentWorkInfo} key={i}></WorkList>
          // );
        });
      }
    } else {
      return <h2>Data not found</h2>;
    }
  }
  render() {
    console.log("this.state.workPostArray", this.state.workPostArray);
    let workPostList = this.state.workPostArray.map(function (workPost, i) {
      return (
        <div className="col-6 col-md-4">
          <WorkCard workPost={workPost} key={i} />
        </div>
      );
    });
    return (
      <div>
        <h2>Work post here</h2>
        {/* <Container fluid> */}
        <div className="container">
          <div className="row">{workPostList}</div>
        </div>
      </div>
    );
  }
}
