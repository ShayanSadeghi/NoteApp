import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Signup from "./components/Signup";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Route exact path="/" component={Signup} />
      </Router>
      <Footer />
    </div>
  );
}

export default App;
