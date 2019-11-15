import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./Main.css";
const cookies = new Cookies();

class MainNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",

      isLoggedIn: false
    };
  }

  componentDidMount() {
    if (cookies.get("auth") !== undefined && cookies.get("auth").loggedIn) {
      this.setState({
        name: cookies.get("auth").name,
        isLoggedIn: cookies.get("auth").loggedIn
      });
    }
  }

  logOut = () => {
    cookies.remove("auth");
    // eslint-disable-next-line no-restricted-globals
    if (cookies.get("auth") === undefined) {
      window.location.replace("/");
    }
  };

  render() {
    let name = "";
    let loginLogOut = "";

    let UserPackeges = "";
    if (this.state.isLoggedIn) {
      console.log(this.state.isLoggedIn);

      name = (
        <li className="nav-item ">
          <div className="nav-link user-name"> `Hello {this.state.name} !`</div>
        </li>
      );

      loginLogOut = (
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item ">
            <Link
              className="nav-item -toggle user"
              onClick={this.logOut}
              to=""
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {" "}
              <i className="fas fa-sign-out-alt fa-2x" />
            </Link>
          </li>
        </ul>
      );

      UserPackeges = (
        <Link className="nav-link" to="/userlines">
          {" "}
          My Packeges
        </Link>
      );
    } else {
      loginLogOut = (
        <ul className="nav navbar-nav navbar-right">
          <li className="nav-item dropdown">
            <Link
              className="nav-item dropdown-toggle user"
              to=""
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fa fa-user fa-lg" />
            </Link>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/login">
                Login
              </Link>
              <Link className="dropdown-item" to="/Register">
                Sign Up{" "}
              </Link>
            </div>
          </li>
        </ul>
      );

      UserPackeges = (
        <Link className="nav-link" to="/Register">
          Join us
        </Link>
      );
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-light">
          <Link className="navbar-brand" to="/">
            <strong>
              <i className="fas fa-phone-volume" /> Zero Telecom
            </strong>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  {" "}
                  Home{" "}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/lines">
                  {" "}
                  Cellolar Packege
                </Link>
              </li>
              <li className="nav-item">{UserPackeges}</li>

              {name}
            </ul>

            {loginLogOut}
          </div>
        </nav>
      </div>
    );
  }
}

export default MainNavBar;
