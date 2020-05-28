import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors:{}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  
  onSubmit(e){
    e.preventDefault();

    const userData = {
      email : this.state.email,
      password: this.state.password
    }
    console.log(userData);
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
              <div className="container col-md-6 text-light text-center">
                <div className="sign-up-form">
                  <form noValidate onSubmit={this.onSubmit}>
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

export default Login;
