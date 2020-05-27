import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={Signup} />
        <Route exact path="/login" component={Login} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
