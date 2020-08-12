import React, { component, Component } from "react";
import axios from "axios";
import { Card, CardDeck, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";

export default class WorkPost extends Component {
  render() {
    return (
      <div>
        <h2>Work post here</h2>
        <CardDeck>
          <Card>
            <Card.Img
              variant="top"
              src={"uploads/2020-07-30T15-34-36.338Z-road_inauguration.jpeg"}
              className="img-thumbnail"
            />
            <Card.Body>
              <Card.Title>अनंतवाडी रास्ता रुंदीकरण</Card.Title>
              <Card.Text>
                अनंतवाडी रास्ता रुंदीकरण दिनांक २७-०८/२०२० रोजी करण्यात आले
                <Link to="/WorkDetails" className="nav-link">
                  सविस्तर माहिती
                </Link>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{" "}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        </CardDeck>
      </div>
    );
  }
}
