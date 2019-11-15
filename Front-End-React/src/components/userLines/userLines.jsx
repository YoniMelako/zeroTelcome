import React, { Component } from "react";
import ClientModel from "../../DAL/ClientModel";
import DeleteBtn from "../DeleteBtn/DeleteBtn";
import "./userlines.css";

class UserLines extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    ClientModel.getuserlines().then(result => {
      this.setState({ lines: result.data.lines });
      console.log(this.state.lines);
    });
  }

  UapdateLinesInState = index => {
    console.log("hii");

    var linesList = [...this.state.lines];
    linesList.splice(index, 1);
    this.setState({ lines: linesList });
  };

  render() {
    let userLineRow = this.state.lines.map((line, i) => {
      if (line !== null) {
        return (
          <tr>
            <th scope="row">{line.name}</th>
            <td>{line.call_minutes}</td>
            <td>{line.internet_giga}</td>
            <td>{line.overseas_calls}</td>

            <td>{line.price}</td>
            <td>
              <DeleteBtn
                line={line}
                index={i}
                UpdateLinesList={this.UapdateLinesInState}
              />
            </td>
          </tr>
        );
      }
      return console.log(`the line is null`);
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Call Minutes</th>
                  <th scope="col">Internet Giga</th>
                  <th scope="col">Overseas Calls</th>

                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>{userLineRow}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLines;
