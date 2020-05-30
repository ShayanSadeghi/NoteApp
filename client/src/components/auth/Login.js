import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

import { loginUser } from "../../actions/authActions";

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
    if (props.errors) {
      return {
        errors: props.errors,
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
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
        <div className="dark-overlay text-light landing-inner">
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
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        className={classnames("form-control", {
                          "is-invalid": errors.email,
                        })}
                        type="email"
                      />
                      {errors.email ? (
                        <div className="invalid-feedback">{errors.email} </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        className={classnames("form-control", {
                          "is-invalid": errors.password,
                        })}
                        type="password"
                      />
                      {errors.password ? (
                        <div className="invalid-feedback">
                          {errors.password}{" "}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
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
