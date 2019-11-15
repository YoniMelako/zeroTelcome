import React, { Component } from "react";

import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();

class AddBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lineToAdd: this.props.line
    };
  }

  addLine = () => {
    if (cookies.get("auth") === undefined) {
      window.location.assign("/login");
    } else {
      let data = {
        userToken: cookies.get("auth").token,
        lineToAdd: this.state.lineToAdd._id
      };
      console.log("lalal");
      axios
        .post("https://zerotelcomeserver.herokuapp.com/users/addline", data)
        .then(result => {
          console.log(result);

          if (result.data.success) {
            window.location.assign("/userlines");
          }
        });
    }
  };

  render() {
    return (
      <button type="button" onClick={this.addLine} className="btn btn-primary">
        Add Line
      </button>
    );
  }
}

export default AddBtn;
