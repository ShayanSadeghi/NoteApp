import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { saveNote } from "../../actions/notesActions";
import UserInfo from "../layout/UserInfo";

class Note extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      body: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancelClik = this.onCancelClik.bind(this);
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
    this.props.saveNote(noteData);
    this.props.history.push("/dashboard");
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
    const { user } = this.props.auth;
    return (
      <div className="note row">
        <UserInfo user={user} />
        <div className="container col-md-8 d-inline-block">
          <div className=" m-auto">
            <form onSubmit={this.onSubmit}>
              <div className="form-group container m-auto">
                <input
                  value={this.state.title}
                  onChange={this.onChange}
                  name="title"
                  className="form-control mb-2"
                  placeholder="Title"
                  type="text"
                />
                <textarea
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
              </div>
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
};

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, { saveNote })(Note);
