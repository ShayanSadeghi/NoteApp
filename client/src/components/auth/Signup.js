import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { registerUser } from "../../actions/authActions";
import InputGroup from "../common/inputGroup";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.auth.isAuthenticated) {
      props.history.push("/dashboard");
      return null;
    }
    if (props.errors) {
      return {
        errors: props.errors, //{errors} actually means this.state.errors
      };
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="landing">
        <div className="overlay text-light landing-inner">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-2 mb-4">Note App</h1>
                <p className="lead">
                  Write your Notes once, Keep them with your self any where
                </p>
                <hr />
              </div>
              <div className="container col-md-6  text-light text-center">
                <div className="sign-up-form ">
                  <form noValidate onSubmit={this.onSubmit}>
                    <InputGroup
                      name="name"
                      placeholder="Name"
                      value={this.state.name}
                      error={errors.name}
                      icon="fas fa-user"
                      onChange={this.onChange}
                      type="text"
                    />
                    <InputGroup
                      name="email"
                      placeholder="E-Mail"
                      value={this.state.email}
                      error={errors.email}
                      icon="fas fa-at"
                      onChange={this.onChange}
                      type="email"
                    />

                    <InputGroup
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      error={errors.password}
                      icon="fas fa-lock"
                      onChange={this.onChange}
                      type="password"
                    />
                    <InputGroup
                      name="password2"
                      placeholder="Confirm Password"
                      value={this.state.password2}
                      error={errors.password2}
                      icon="fas fa-lock"
                      onChange={this.onChange}
                      type="password"
                    />

                    <button type="submit" className="btn btn-primary mr-5">
                      Sign Up
                    </button>
                    <Link to="/login" className="text-secondary">
                      Login
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
