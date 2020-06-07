import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserNotes } from "../../actions/notesActions";
import ShowCards from "./ShowCards";
import UserInfo from "../layout/UserInfo";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserNotes();
  }

  render() {
    const { user } = this.props.auth;
    let notes = this.props.notes;

    let dashboardContent;

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
        dashboardContent = notes.map(note => (
          <ShowCards key={note._id} note={note} />
        ));
      }
    }

    return (
      <div className="dashboard">
        <UserInfo user={user} history={this.props.history} />
        <div className="container d-inline-block ">
          <div className="row m-auto">{dashboardContent}</div>
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
