import React, { Component } from "react";
import ClientModel from "../../DAL/ClientModel";
import Axios from "axios";

class DeleteBtn extends Component {
  constructor(props) {
    super(props);

    this.state = { index: this.props.index, line: this.props.line };
  }

  removeLine = e => {
    e.preventDefault();
    console.log(this.props.line._id);

    ClientModel.removelineFromUser(this.props.line._id).then(response => {
      console.log(response);
      this.UpdateUserLineslist();
    });
  };

  UpdateUserLineslist = () => {
    this.props.UpdateLinesList(this.state.index);
  };

  render() {
    return (
      <button type="button" onClick={this.removeLine} class="btn btn-danger">
        Remove
      </button>
    );
  }
}

export default DeleteBtn;
