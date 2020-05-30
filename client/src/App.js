import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
        </Router>
        <Footer />
      </Provider>
    );
  }
}

export default App;
