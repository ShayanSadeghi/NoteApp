import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Note from "./components/notes/Note";
import Profile from "./components/profile/Profile";

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearNotes } from "./actions/notesActions";
import jwt_decode from "jwt-decode";

import "antd/dist/antd.css";
import "./App.css";

const darkmode = localStorage.getItem("darkmode") === "true" ? true : false;

if (darkmode) {
  require("./AppDark.scss");
} else {
  require("./AppLight.scss");
}

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearNotes());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute path="/newNote" component={Note} />
          </Switch>
          <Switch>
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Router>
        <Footer />
      </Provider>
    );
  }
}

export default App;
