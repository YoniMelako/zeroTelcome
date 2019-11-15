import React from "react";
import "./App.css";

import Main from "./components/navbar/Main";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/RegisterForm/Register";
import Homeview from "./components/Home/HomeView";
import Lines from "./components/lines/lines";
import UserLines from "./components//userLines/userLines";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="main-div">
          <Main />

          <Route>
            <Switch>
              <Route path="/" exact component={Homeview} />
              <Route path="/login" component={Login} />
              <Route path="/Register" component={Register} />
              <Route path="/lines" component={Lines} />
              <Route path="/mypackeges" component={Lines} />
              <Route path="/userlines" component={UserLines} />
            </Switch>
          </Route>
        </div>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
