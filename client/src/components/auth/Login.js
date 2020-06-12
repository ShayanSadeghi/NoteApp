import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { loginUser } from "../../actions/authActions";
import InputGroup from "../common/inputGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
        errors: props.errors,
      };
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
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
              <div className="container col-md-6 text-light text-center">
                <div className="sign-up-form">
                  <form noValidate onSubmit={this.onSubmit}>
                    <InputGroup
                      name="email"
                      placeholder="Email"
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
                    <button type="submit" className="btn btn-primary mr-5">
                      Login
                    </button>

                    <Link to="/" className="text-secondary">
                      Sign-up
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
