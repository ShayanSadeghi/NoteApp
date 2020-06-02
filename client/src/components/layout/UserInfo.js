import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserInfo extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className=" container mb-4 d-inline-block w20rem">
        <div className="mr-auto card border border-dark p-3">
          <div className="card-body">
            <img src="" alt="" className="card-img-top" />
            <p className="card-title">{user.name}</p>
            <p className="">Email: {user.email}</p>
            <Link to="" className="btn btn-success d-block mb-2">
              New Note
            </Link>
            <Link to="" className="btn btn-sm btn-outline-secondary ">
              Profile
            </Link>
            <Link to="" className="btn btn-sm btn-outline-secondary">
              Stats
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
