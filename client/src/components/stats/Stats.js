import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getUserNotes } from "../../actions/notesActions";

class Stats extends Component {
  constructor() {
    super();
    this.state = {
      chartContent: <Bar />,
    };
    this.chartSelectorHandler = this.chartSelectorHandler.bind(this);
    this.setChartData = this.setChartData.bind(this);
  }

  componentDidMount() {
    this.props.getUserNotes();
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.notes) {
      this.setState({ chartContent: <Bar data={this.setChartData} /> });
      console.log(this.state);
    }
  }
  setChartData = () => {
    const { notes } = this.props;
    const labelsArr = [];
    const countsArr = [];
    const newBgColorArr = [];

    const o = Math.round,
      r = Math.random,
      s = 255;

    notes.forEach(note => {
      const date = note.date.slice(0, 10);
      if (labelsArr.indexOf(date) === -1) {
        labelsArr.push(date);
        const newNotes = notes.filter(note => note.date.slice(0, 10) === date);
        countsArr.push(newNotes.length);

        newBgColorArr.push(
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
    return {
      labels: labelsArr,
      datasets: [
        {
          label: "Notes",
          data: countsArr,
          backgroundColor: newBgColorArr,
        },
      ],
    };
  };

  chartSelectorHandler = e => {
    const chartData = this.setChartData;
    switch (e.key) {
      case "Bar":
        this.setState({ chartContent: <Bar data={chartData} /> });
        break;
      case "Line":
        this.setState({ chartContent: <Line data={chartData} /> });
        break;
      case "Pie":
        this.setState({ chartContent: <Pie data={chartData} /> });
        break;
      case "Doughnut":
        this.setState({
          chartContent: <Doughnut data={chartData} />,
        });
        break;
      default:
        this.setState({ chartContent: <Bar data={this.state.chartData} /> });
    }
  };
  render() {
    const menu = (
      <Menu onClick={this.chartSelectorHandler}>
        <Menu.Item key="Bar">
          <a>Bar</a>
        </Menu.Item>
        <Menu.Item key="Line">
          <a>Line</a>
        </Menu.Item>
        <Menu.Item key="Pie">
          <a>Pie</a>
        </Menu.Item>
        <Menu.Item key="Doughnut">
          <a>Doughnut</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="container">
        <div className="row  align-items-center">
          <div className="col-lg-2">
            <Dropdown trigger={["click"]} overlay={menu}>
              <a className="mr-2">
                Type
                <DownOutlined />
              </a>
            </Dropdown>
          </div>
          <div className="col-lg-10">{this.state.chartContent}</div>
        </div>
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
