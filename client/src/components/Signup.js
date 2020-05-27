import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signup extends Component {
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
                  <form>
                    <div className="form-group ">
                      <label htmlFor="name">Name</label>
                      <input className="form-control" type="text" id="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input className="form-control" type="email" id="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password2">Confirm password</label>
                      <input
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
