import React, { Component } from "react";
import "./form.css";
import validators from "./validator";
import ClientModel from "../../DAL/ClientModel";

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      RegisterSuccess: "",
      newclient: "",
      userInfo: {
        firstname: "",
        lastname: "",
        Id: "",
        birthday: "",
        password: "",
        address: "",
        city: ""
      }
    };

    // Set of validators for signin form
    this.validators = validators;

    // This resets our form when navigating between views
    this.resetValidators();

    // Correctly Bind class methods to reacts class instance
    this.handleInputChange = this.handleInputChange.bind(this);
    this.displayValidationErrors = this.displayValidationErrors.bind(this);
    this.updateValidators = this.updateValidators.bind(this);
    this.resetValidators = this.resetValidators.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isFormValid = this.isFormValid.bind(this);
  }

  closeModal = () => {
    this.setState({
      RegisterSuccess: "",
      newclient: "",
      userInfo: {
        firstname: "",
        lastname: "",
        Id: "",
        birthday: "",
        password: "",
        address: "",
        city: ""
      }
    });
  };

  /**
   * This function is called whenever a form input is changed
   * Which in turn updates the state of this component and validators
   */
  handleInputChange(event) {
    const newState = Object.assign({}, this.state);
    newState.userInfo[event.target.name] = event.target.value;

    this.setState(newState);
    if (
      event.target.name !== "address" &&
      event.target.name !== "city" &&
      event.target.name !== "birthday"
    ) {
      this.updateValidators(event.target.name, event.target.value);
    }

    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * This function handles the logic when submiting the form.
   * @TODO make an API request to authenticate the user
   */
  handleSubmit(e) {
    e.preventDefault();
    let FormData = {
      firstname: this.state.userInfo.firstname,
      lastname: this.state.userInfo.lastname,
      Id: this.state.userInfo.Id,
      password: this.state.userInfo.password,
      address: this.state.userInfo.address,
      city: this.state.userInfo.city,
      birthday: this.state.userInfo.birthday
    };

    let RegisterSuccess;
    ClientModel.Register(FormData).then(result => {
      if (result.success) {
        RegisterSuccess = true;
        let newclient = this.state.userInfo.firstname;

        this.resetValidators();
        this.setState({
          RegisterSuccess: RegisterSuccess,
          newclient: newclient,
          userInfo: {
            firstname: "",
            lastname: "",
            Id: "",
            birthday: "",
            password: "",
            address: "",
            city: ""
          }
        });

        this.props.history.push("/login");
      } else if (result.error) {
        RegisterSuccess = false;
        this.setState({ RegisterSuccess: RegisterSuccess });
      }

      console.log(result);
    });
  }

  /**
   * This function updates the state of the validator for the specified validator
   */
  updateValidators(fieldName, value) {
    this.validators[fieldName].errors = [];
    this.validators[fieldName].state = value;
    this.validators[fieldName].valid = true;
    this.validators[fieldName].rules.forEach(rule => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          this.validators[fieldName].errors.push(rule.message);
          this.validators[fieldName].valid = false;
        }
      }
    });
  }

  // This function resets all validators for this form to the default state
  resetValidators() {
    Object.keys(this.validators).forEach(fieldName => {
      this.validators[fieldName].errors = [];
      this.validators[fieldName].state = "";
      this.validators[fieldName].valid = false;
    });
  }

  // This function displays the validation errors for a given input field
  displayValidationErrors(fieldName) {
    const validator = this.validators[fieldName];
    const result = "";
    if (validator && !validator.valid) {
      const errors = validator.errors.map((info, index) => {
        return (
          <span className="error" key={index}>
            * {info}
          </span>
        );
      });

      return (
        <div className="col s12 row" style={{ color: "red" }}>
          {errors}
        </div>
      );
    }
    return result;
  }

  // This method checks to see if the validity of all validators are true
  isFormValid() {
    let status = true;
    Object.keys(this.validators).forEach(field => {
      if (!this.validators[field].valid) {
        status = false;
      }
    });
    return status;
  }

  render() {
    console.log(this.RegisterSuccess);

    let message = "";

    if (this.state.RegisterSuccess === true) {
      message = (
        <div className="registerSuccess" style={{ color: "green" }}>
          Welcome {this.state.newclient} Your Register success
        </div>
      );
    } else if (this.state.RegisterSuccess === false) {
      message = (
        <div className="registerError" style={{ color: "red" }}>
          User alredy exist Please Try agian
        </div>
      );
    }

    return (
      <div className="form-style">
        <div className="modal-body">
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputfirstname4">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={this.state.userInfo.firstname}
                  onChange={event => this.handleInputChange(event)}
                  id="inputfirstname4"
                  placeholder="First name"
                />
                {this.displayValidationErrors("firstname")}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputlastname4">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={this.state.userInfo.lastname}
                  onChange={event => this.handleInputChange(event)}
                  id="inputlastname4"
                  placeholder="Last name"
                />
                {this.displayValidationErrors("lastname")}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={this.state.userInfo.city}
                  onChange={event => this.handleInputChange(event)}
                  id="inputCity"
                  placeholder="Ramle"
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputaddress">Street</label>
                <input
                  type="text"
                  name="address"
                  value={this.state.userInfo.address}
                  onChange={event => this.handleInputChange(event)}
                  className="form-control"
                  id="inputaddress"
                  placeholder="Ben Gurion"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputbirthday">Bitrh day</label>
              <input
                type="date"
                className="form-control"
                name="birthday"
                value={this.state.userInfo.birthday}
                onChange={event => this.handleInputChange(event)}
                id="inputbirthday"
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputId">ID</label>
              <input
                type="text"
                className="form-control"
                name="Id"
                value={this.state.userInfo.Id}
                onChange={event => this.handleInputChange(event)}
                id="inputId"
              />
              {this.displayValidationErrors("Id")}
            </div>
            <div className="form-group">
              <label htmlFor="inputpassword">Password</label>
              <input
                type="password"
                className="form-control "
                name="password"
                value={this.state.userInfo.password}
                onChange={event => this.handleInputChange(event)}
                id="inputpassword"
              />
              {this.displayValidationErrors("password")}
            </div>

            {message}
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleSubmit}
              disabled={!this.isFormValid()}
            >
              Sign in
            </button>
          </form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-default"
            data-dismiss="modal"
            onClick={this.closeModal}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
