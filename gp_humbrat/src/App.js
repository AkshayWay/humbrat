import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import ReactBootstrap, {
  Navbar,
  Button,
  Nav,
  Col,
  Form,
  FormControl,
  Grid,
  Panel,
  FormGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import gp_banner from "./assets/images/gp_banner.jpg";
// import gp_population from "./assets/images/gp_population.png";
// import gp_connectivity from "./assets/images/gp_connectivity.png";
// import gp_literacy from "./assets/images/gp_literacy.png";

import Navigation from "./component/Navigation";
import HomePage from "./component/HomePage";
import Footer from "./component/Footer";
import Officers from "./component/Officer";
import AdminPortal from "./component/AdminPortal";
import EditNews from "./component/EditNews";

function App() {
  return (
    <Router>
      <div className="container">
        <Navigation />
        <div className="container" style={{ minHeight: 511 + "px" }}>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/officer" component={Officers}></Route>
          <Route path="/adminPortal" component={AdminPortal}></Route>
          <Route path="/editNews/:id" component={EditNews}></Route>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;