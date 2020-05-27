import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Signup from "./components/layout/Signup";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Signup />
      <Footer />
    </div>
  );
}

export default App;
