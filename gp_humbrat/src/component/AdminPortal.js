import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";

export default class AdminPortal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsTitle: "",
    };
  }
  render() {
    return (
      <div>
        <h1>Admin page</h1>
        <p>
          <button
            class="btn btn-primary"
            type="button"
            data-toggle="collapse"
            data-target="#collapseNewsDiv"
            aria-expanded="false"
            aria-controls="collapseNewsDiv"
          >
            सूचना
          </button>
        </p>
        <div class="collapse" id="collapseNewsDiv">
          <div class="card card-body">
            <form>
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
              {/* <div className="form-group">
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
              </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
