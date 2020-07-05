import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { getUserNotes } from "../../actions/notesActions";

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Notes",
            data: [],
            borderWidth: 1,
            borderColor: "#333",
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.props.getUserNotes();
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.notes) {
      const newLabels = [];
      const newData = [];
      const newBgColor = [];
      const o = Math.round,
        r = Math.random,
        s = 255;
      nextProp.notes.forEach(note => {
        const date = note.date.slice(0, 10);
        if (newLabels.indexOf(date) === -1) {
          newLabels.push(date);
          const newNotes = nextProp.notes.filter(
            note => note.date.slice(0, 10) === date
          );
          newData.push(newNotes.length);

          newBgColor.push(
            "rgba(" +
              o(r() * s) +
              "," +
              o(r() * s) +
              "," +
              o(r() * s) +
              "," +
              r().toFixed(1) +
              ")"
          );
        }
      });
      const chartData = {
        labels: newLabels,
        datasets: [
          {
            label: "Notes",
            data: newData,
            backgroundColor: newBgColor,
          },
        ],
      };
      this.setState({ chartData });
    }
  }

  render() {
    return (
      <div>
        <Bar data={this.state.chartData} />
      </div>
    );
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
