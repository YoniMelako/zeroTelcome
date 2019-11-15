import React, { Component } from "react";
import { BrowserRouter as Link } from "react-router-dom";

import "./HomeView.css";

class Homeview extends Component {
  render() {
    return (
      <div>
        <div className="view">
          <div className="mask rgba-black-light flex-center" />
          <div class="container text-center  white-text">
            <div
              class="white-text text-center wow fadeInUp animated"
              style={{ visibility: "visible", animationName: "fadeInUp" }}
            >
              <h2>Welcome to Zero Telecom</h2>
              Our Company provide the best services you can get
              <br />
              <br />
              <br />
              <p>
                <a href="/lines" className="btn btn-success">
                  Get started
                </a>
                {/* <Link  to=>
                  
                </Link> */}
              </p>
              <div />
            </div>
          </div>

          <div />
        </div>
      </div>
    );
  }
}

export default Homeview;
