import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUserNotes } from "../../actions/notesActions";

class Stats extends Component {
  componentDidMount() {
    this.props.getUserNotes();
  }

  render() {
    return <div></div>;
  }
}

Stats.propTypes = {
  auth: PropTypes.object,
  notes: PropTypes.array.isRequired,
  getUserNotes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  notes: state.notes,
});

export default connect(mapStateToProps, { getUserNotes })(Stats);
