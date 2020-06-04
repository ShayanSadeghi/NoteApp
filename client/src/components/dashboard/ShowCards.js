import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteNote } from "../../actions/notesActions";

class ShowCards extends Component {
  onEditClick(e) {
    window.location.pathname = `/newNote/${this.props.note._id}`;
  }
  onDeleteClick(e) {
    this.props.deleteNote(this.props.note._id);
  }

  render() {
    return (
      <div className="w18rem card  mr-auto mb-3 ">
        <div className="card-body">
          <img src="" alt="" className="card-img-top" />
          <h5 className="card-title">{this.props.note.title}</h5>
          <p className="card-text">{this.props.note.body}</p>
          <button
            onClick={this.onEditClick.bind(this)}
            className="btn btn-outline-primary mr-2">
            Edit
          </button>
          <button
            onClick={this.onDeleteClick.bind(this)}
            className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { deleteNote })(ShowCards);
