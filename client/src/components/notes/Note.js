import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveNote, getUserNotes, updateNote } from "../../actions/notesActions";
import InputGroup from "../common/inputGroup";

let pathSplited;
class Note extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
      isNoteEmpty: true,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelClik = this.onCancelClik.bind(this);
  }

  componentDidMount() {
    this.props.getUserNotes();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const noteData = {
      user: this.props.auth.user._id,
      title: this.state.title,
      body: this.state.body,
    };

    pathSplited = window.location.pathname.split("/");
    if (pathSplited.length === 3) {
      this.props.updateNote(noteData, pathSplited[2]);
    } else {
      this.props.saveNote(noteData);
    }

    this.props.history.push("/dashboard");
    this.props.getUserNotes();
  }

  onCancelClik() {
    let ans = true;

    if (this.state.title || this.state.body) {
      ans = window.confirm("Are you sure?");
    }

    if (ans) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    pathSplited = window.location.pathname.split("/");
    if (pathSplited.length === 3 && this.state.isNoteEmpty) {
      this.props.notes.forEach(note => {
        if (note._id === pathSplited[2]) {
          this.setState({
            title: note.title,
            body: note.body,
            isNoteEmpty: false,
          });
        }
      });
    }
    return (
      <div className="note row">
        <div className="container col-md-8 d-inline-block">
          <div className=" m-auto">
            <form onSubmit={this.onSubmit}>
              <InputGroup
                value={this.state.title}
                onChange={this.onChange}
                name="title"
                className="form-control mb-2"
                placeholder="Title"
                type="text"
              />
              <textarea
                id="body"
                value={this.state.body}
                onChange={this.onChange}
                name="body"
                className="form-control mb-2"
                placeholder="Body"
                rows="10"></textarea>
              <button
                type="submit"
                className="btn mr-2 btn-outline-success form-control-sm"
                disabled={!this.state.title && !this.state.body}>
                {" "}
                Save
              </button>
              <button
                onClick={this.onCancelClik}
                type="button"
                className=" btn btn-outline-danger form-control-sm">
                {" "}
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  auth: PropTypes.object.isRequired,
  saveNote: PropTypes.func.isRequired,
  getUserNotes: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  notes: state.notes,
});
export default connect(mapStateToProps, { saveNote, getUserNotes, updateNote })(
  Note
);
