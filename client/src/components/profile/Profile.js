import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Input, Select, DatePicker } from "antd";
import moment from "moment";
import { getUserProfile, setUserProfile } from "../../actions/profileActions";

const { Option } = Select;
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      address: "",
      job: "",
      birthdate: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    this.props.getUserProfile();
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.profile) {
      this.setState({
        fname: nextProp.profile.fname,
        lname: nextProp.profile.lname,
        phone: nextProp.profile.phone,
        address: nextProp.profile.address,
        job: nextProp.profile.job,
        birthdate: nextProp.profile.birthdate,
      });
    }
  }

  changeHandler(e, s) {
    if (s) {
      this.setState({ birthdate: s });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  submitHandler(e) {
    e.preventDefault();
    if (this.props.profile._id) {
      this.props.setUserProfile(this.state, false);
    } else {
      this.props.setUserProfile(this.state, true);
    }
    this.props.history.push("/");
  }
  render() {
    // No Need to these data, just for test features
    let Codes = [
      {
        name: "Afghanistan",
        dial_code: "+93",
        code: "AF",
      },
      {
        name: "Iran",
        dial_code: "+98",
        code: "IR",
      },
      {
        name: "Russia",
        dial_code: "+7",
        code: "RU",
      },
      {
        name: "United States",
        dial_code: "+1",
        code: "US",
      },
      {
        name: "Ukraine",
        dial_code: "+380",
        code: "UA",
      },
    ];

    const selectBefore = (
      <Select defaultValue="+98" className="select-before">
        {Codes.map(code => (
          <Option value={code.name}>{code.dial_code}</Option>
        ))}
      </Select>
    );

    return (
      <div className="container col-md-6">
        <div className="row">
          <form class="m-auto" onSubmit={this.submitHandler}>
            <Input
              value={this.state.fname}
              onChange={this.changeHandler}
              name="fname"
              size="large"
              className="mb-3"
              placeholder="First Name"
            />
            <Input
              value={this.state.lname}
              onChange={this.changeHandler}
              name="lname"
              size="large"
              className="mb-3"
              placeholder="Last Name"
            />
            <Input
              value={this.state.phone}
              onChange={this.changeHandler}
              addonBefore={selectBefore}
              name="phone"
              size="large"
              className="mb-3"
              placeholder="Phone"
            />
            <Input
              value={this.state.address}
              onChange={this.changeHandler}
              name="address"
              size="large"
              className="mb-3"
              placeholder="Address"
            />
            <Input
              value={this.state.job}
              onChange={this.changeHandler}
              name="job"
              size="large"
              className="mb-3"
              placeholder="Job"
            />
            <DatePicker
              onChange={this.changeHandler}
              value={moment(this.state.birthdate, "YYYY-MM-DD")}
              name="birthdate"
              format="YYYY-MM-DD"
              className="mb-3"
              placeholder="Birth Date"
              size="large"
              style={{ width: "100%" }}
            />
            <div className="form-control custom-file mb-3">
              <input
                className="custom-file-input"
                type="file"
                accept="image/*"
                id="inputFile"
              />
              <label for="inputFile" class="custom-file-label">
                {" "}
                Profile Image{" "}
              </label>
            </div>
            <button
              type="submit"
              className="form-control btn btn-outline-success mb-3 ">
              Submit
            </button>
            <button
              onClick={() => this.props.history.push("/")}
              className="form-control btn btn-danger">
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}
Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  setUserProfile: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getUserProfile, setUserProfile })(
  Profile
);
