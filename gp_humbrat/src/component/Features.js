import React, { component, Component } from "react";

export default class Features extends Component {
  render() {
    return (
      <div>
        <h1>Features here</h1>
        <div className="card mb-3" style={{ maxWidth: 100 + "%" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={"work/2020-08-31T17-44-54.518Z-Bhorapi_vadi_2.jpeg"}
                class="card-img"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card mb-3" style={{ maxWidth: 100 + "%" }}>
          <div className="row no-gutters">
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
