import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearNotes } from "../../actions/notesActions";

import { Switch } from "antd";
// import { CheckOutlined } from "@ant-design/icons";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearNotes();
    this.props.logoutUser();
  };

  toggleDarkMode = e => {
    localStorage.setItem("darkmode", e);
    window.location.href = window.location.href;
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let NavContent;
    let mode;

    let iMode = localStorage.getItem("darkmode");
    if (iMode === "true") {
      mode = (
        <Switch
          defaultChecked
          onChange={this.toggleDarkMode.bind(this)}
          checkedChildren={<i className="fas fa-moon"> </i>}
          unCheckedChildren={<i className="fas fa-moon"></i>}
        />
      );
    } else {
      mode = (
        <Switch
          onChange={this.toggleDarkMode.bind(this)}
          checkedChildren={<i className="fas fa-moon"> </i>}
          unCheckedChildren={<i className="fas fa-moon"></i>}
        />
      );
    }

    if (!isAuthenticated) {
      //Guest Content
      NavContent = (
        <div className="container">
          <ul className="navbar-nav ml-auto">
            <li className={classnames("nav-item")}>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li className={classnames("nav-item")}>
              <Link className="nav-link" to="/">
                Sign-Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/notes">
                Docs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      //User Content
      NavContent = (
        <div className="container">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/notes">
                Notes
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                className="nav-link"
                to=""
                onClick={this.onLogoutClick.bind(this)}>
                Logout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                {user.name}
              </Link>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            NoteApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            {mode}
            {NavContent}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearNotes })(Navbar);
