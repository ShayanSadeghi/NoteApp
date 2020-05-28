import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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

    axios
      .post('/api/users/register', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
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
                        className="form-control"
                        type="text"
                        id="name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        className="form-control"
                        type="email"
                        id="email"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        className="form-control"
                        type="password"
                        id="password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password2">Confirm password</label>
                      <input
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        className="form-control"
                        type="password"
                        id="password2"
                      />
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

export default Signup;
