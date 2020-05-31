import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserNotes } from "../../actions/notesActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserNotes();
  }
  render() {
    const { user } = this.props.auth;
    
    return (
      <div>
        <div className=" container mb-4 d-inline-block">
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
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
  getUserNotes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  notes: state.notes,
});

export default connect(mapStateToProps, { getUserNotes })(Dashboard);
