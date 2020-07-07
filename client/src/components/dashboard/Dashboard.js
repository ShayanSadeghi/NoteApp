import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserNotes, deleteNote } from "../../actions/notesActions";
import ShowCards from "./ShowCards";
import UserInfo from "../layout/UserInfo";
import Pagination from "../common/pagination";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      contentPerPage: 12,
    };
  }

  editHandler(id) {
    window.location.pathname = `/newNote/${id}`;
  }

  deleteHandler = id => {
    this.props.deleteNote(id);
  };

  componentDidMount() {
    this.props.getUserNotes();
  }

  changePageHandler(page) {
    this.setState(oldState => ({
      offset: page * oldState.contentPerPage - oldState.contentPerPage,
    }));
  }

  render() {
    const { user } = this.props.auth;
    let notes = this.props.notes;

    let dashboardContent;
    let paginationContent;

    //Notes
    if (notes === null) {
      dashboardContent = <p>Loading...</p>;
    } else {
      // Welcome, write a new Note!
      if (notes.length === 0) {
        dashboardContent = (
          <div className="card mr-auto mb-3 w18rem">
            <div className="card-body">
              <img src="" alt="" className="card-img-top" />
              <h5 className="card-title"> Welcome</h5>
              <p className="card-text">You don't have any note Yet..</p>
              <button className="btn btn-outline-primary">Start Now!</button>
            </div>
          </div>
        );
      } else {
        //if user has some notes, we show them here
        const notesInPage = notes.slice(
          this.state.offset,
          this.state.offset + this.state.contentPerPage
        );
        dashboardContent = notesInPage.map(note => (
          <ShowCards
            key={note._id}
            note={note}
            deleteHandler={this.deleteHandler.bind(this)}
            editHandler={this.editHandler.bind(this)}
          />
        ));
        paginationContent = (
          <div className="row justify-content-center my-3">
            <Pagination
              contentCount={notes.length}
              contentPerPage={this.state.contentPerPage}
              changePageHandler={this.changePageHandler.bind(this)}
            />
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="row justify-content-start">
          <UserInfo user={user} history={this.props.history} />
          <div className="container d-inline-block">
            <div className="row">{dashboardContent}</div>
          </div>
        </div>
        {paginationContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
  getUserNotes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  notes: state.notes,
});

export default connect(mapStateToProps, { getUserNotes, deleteNote })(
  Dashboard
);
