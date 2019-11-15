import React, { Component } from "react";
import LineModel from "../../DAL/LiensModel";
import LineCard from "../lineCard/LineCard";

import Cookies from "universal-cookie";
import "./liens.css";
const cookies = new Cookies();

class Lines extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: []
    };
  }

  componentDidMount() {
    console.log("mount");
    LineModel.getLiens().then(result => {
      if (result.error) {
        console.log(result.error);
      } else if (result.success) {
        this.setState({ lines: result.lines });
      }
    });
  }

  render() {
    let x = this.state.lines.map(line => {
      return <LineCard key={this.state.lines.indexOf(line)} line={line} />;
    });
    return (
      <div className="container">
        <div className="lines-body">
          <div>Our Lines</div>

          <div className="container">
            <div className="row">{x}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lines;
