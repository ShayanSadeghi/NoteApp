import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserNotes } from "../../actions/notesActions";
import ShowCards from "./ShowCards";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserNotes();
  }

  render() {
    const { user } = this.props.auth;
    let notes = this.props.notes;

    let dashboardContent;

    //Sidebox
    const userData = (
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

    //Notes
    if (notes === null) {
      dashboardContent = <p>Loading...</p>;
    } else {
      // Welcome, write a new Note!
      console.log(notes);
      if (notes.length === 0) {
        dashboardContent = (
          <div class="card mr-auto mb-3 w18rem">
            <div class="card-body">
              <img src="" alt="" class="card-img-top" />
              <h5 class="card-title"> Welcome</h5>
              <p class="card-text">You don't have any note Yet..</p>
              <a href="" class="btn btn-outline-primary">
                Start Now!
              </a>
            </div>
          </div>
        );
      } else {
        //if user has some notes, we show them here
        dashboardContent = notes.map(note => <ShowCards note={note} />);
      }
    }

    return (
      <div className="dashboard row">
        {userData}
        <div className="container">
          <div className="row">{dashboardContent}</div>
        </div>
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

export default connect(mapStateToProps, { getUserNotes })(Dashboard);
