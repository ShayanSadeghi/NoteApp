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
                type="text"
                label="Title"
              />
              <div className="input-group">
                <div className="input-group-prepend mb-2">
                  <span className="input-group-text">Note</span>
                </div>
                <textarea
                  
                  className={
                    "form-control form-control mb-2 input-group-prepend"
                  }
                  name="body"
                  value={this.state.body}
                  onChange={this.onChange}
                  rows="10"
                />
              </div>

              <button
                type="submit"
                className="float-right btn mr-2 text-success form-control-lg"
                disabled={!this.state.title && !this.state.body}>
                {" "}
                Save
              </button>
              <button
                onClick={this.onCancelClik}
                type="button"
                className="btn btn-outline-danger form-control-lg">
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
