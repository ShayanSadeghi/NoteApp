import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { registerUser } from "../../actions/authActions";

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
              <div className="container col-md-6  text-light text-center">
                <div className="sign-up-form ">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group ">
                      <label htmlFor="name">Name</label>
                      <input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        className={classnames("form-control", {
                          "is-invalid": errors.name,
                        })}
                        type="text"
                      />
                      {errors.name ? (
                        <div className="invalid-feedback">{errors.name} </div>
                      ) : (
                        ""
                      )}
                    </div>
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
                        <div className="invalid-feedback">{errors.email}</div>
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
                          {errors.password}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password2">Confirm password</label>
                      <input
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        className={classnames("form-control", {
                          "is-invalid": errors.password2,
                        })}
                        type="password"
                      />
                      {errors.password2 ? (
                        <div className="invalid-feedback">
                          {errors.password2}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
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
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Signup));
