import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  withRouter,
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
import "react-notifications-component/dist/theme.css";

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
import Instruction from "./component/Instructions";
import Login from "./component/Login";
import WorkPost from "./component/WorkPost";
import WorkDetails from "./component/WorkDetails";
import Features from "./component/Features";
import AddEditOfficers from "./component/AddEditOfficers";
import AddEditEmployees from "./component/AddEditEmployees";
//notification component
import ReactNotification from "react-notifications-component";
//React idle timeout
import IdleTimeout from "./common/IdleTimeContainer";

const Main = withRouter(({ location }) => {
  return (
    <div className="container">
      {location.pathname == "/sign_in" ? null : <Navigation />}
      <Route path="/" exact component={HomePage}></Route>
      <Route path="/officer" component={Officers}></Route>
      {localStorage.getItem("userEmail") != null ? (
        <div>
          {/* <Route path="/adminPortal" component={AdminPortal}></Route> */}
          <Route path="/editNews/:id" component={EditNews}></Route>
          <Route path="/add_officers/:id" component={AddEditOfficers}></Route>
          <Route path="/edit_officers/:id" component={AddEditOfficers}></Route>
          <Route path="/add_employee/:id" component={AddEditEmployees}></Route>
          <Route path="/edit_employee/:id" component={AddEditEmployees}></Route>
          <Route path="/instruction/:id" component={Instruction}></Route>
          <IdleTimeout></IdleTimeout>
        </div>
      ) : null}
      <Route path="/adminPortal" component={AdminPortal}></Route>
      <Route path="/WorkPost" component={WorkPost}></Route>
      <Route path="/WorkDetails/:id" component={WorkDetails}></Route>
      <Route path="/sign_in" component={Login}></Route>
      <Route path="/features" component={Features}></Route>

      {location.pathname == "/sign_in" ? null : <Footer />}
    </div>
  );
});
function App() {
  return (
    <Router>
      {/* <div className="container">
        <Navigation />
        <div className="container" style={{ minHeight: 511 + "px" }}>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/officer" component={Officers}></Route>
          <Route path="/adminPortal" component={AdminPortal}></Route>
          <Route path="/editNews/:id" component={EditNews}></Route>
          <Route path="/instruction/:id" component={Instruction}></Route>
          <Route path="/WorkPost" component={WorkPost}></Route>
          <Route path="/WorkDetails/:id" component={WorkDetails}></Route>
        </div>
        <Footer />
      </div> */}
      <ReactNotification />
      <Main />
    </Router>
  );
}

export default App;
