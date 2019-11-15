import React, { Component } from "react";
import "./form.css";
import ClientModel from "../../DAL/ClientModel";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: "",
      password: ""
    };
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    let LoginFormData = {
      Id: this.state.Id,
      password: this.state.password
      //authToken: cookies.get('auth').token
    };

    ClientModel.Login(LoginFormData).then(result => {
      console.log(result);
      if (result === true) {
        // eslint-disable-next-line no-restricted-globals
        window.location.replace("/lines");
      }
    });
  };

  render() {
    return (
      <div className="form-body">
        <div className="form-style">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group ">
              <label htmlFor="inputfirstname4">ID:</label>
              <input
                type="text"
                className="form-control"
                name="Id"
                maxLength="9"
                id="inputId"
                onChange={event => this.handleInputChange(event)}
                placeholder="Enter your Id"
              />
            </div>

            <div className="form-group ">
              <label htmlFor="inputlastname4">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="inputpassword"
                onChange={event => this.handleInputChange(event)}
                placeholder="Enter your password"
              />
            </div>

            <br />
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
            <p>
              not a member ?{" "}
              <a href="/Register" className="register-click">
                click to register
              </a>{" "}
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
