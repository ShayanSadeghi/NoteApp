import React, { Component } from "react";
import { Link } from "react-router-dom";

class ShowCards extends Component {
  render() {
    return (
      <div class="card mr-auto mb-3 w18rem">
        <div class="card-body">
          <img src="" alt="" class="card-img-top" />
          <h5 class="card-title">{this.props.note.title}</h5>
          <p class="card-text">{this.props.note.body}</p>
          <Link to="" class="btn btn-outline-primary mr-2">
            Edit
          </Link>
          <Link to="" class="btn btn-danger">
            Delete
          </Link>
        </div>
      </div>
    );
  }
}

export default ShowCards;
