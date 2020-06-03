import React, { Component } from "react";

export default class UserInfo extends Component {
  onNewNoteClick(e) {
    this.props.history.push("/newNote");
  }

  render() {
    const { user } = this.props;
    return (
      <div className=" container mb-4 d-inline-block w20rem">
        <div className="mr-auto card border border-dark p-3">
          <div className="card-body">
            <img src="" alt="" className="card-img-top" />
            <p className="card-title">{user.name}</p>
            <p className="">Email: {user.email}</p>
            <button
              className="btn btn-success d-block mb-2"
              onClick={this.onNewNoteClick.bind(this)}>
              New Note
            </button>
            <button className="btn btn-sm btn-outline-secondary ">
              Profile
            </button>
            <button className="btn btn-sm btn-outline-secondary">Stats</button>
          </div>
        </div>
      </div>
    );
  }
}
