import React, { Component } from "react";
import { Input, Select, DatePicker } from "antd";

const { Option } = Select;

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      address: "",
      job: "",
      errors: {},
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    // No Need to these data, just for test features
    const { errors } = this.state;
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
          <form class="m-auto">
            <Input size="large" className="mb-3" placeholder="First Name" />
            <Input size="large" className="mb-3" placeholder="Last Name" />
            <Input
              addonBefore={selectBefore}
              size="large"
              className="mb-3"
              placeholder="Phone"
            />
            <Input size="large" className="mb-3" placeholder="Address" />
            <Input size="large" className="mb-3" placeholder="Job" />
            <DatePicker
              className="mb-3"
              placeholder="Birth Date"
              size="large"
              style={{ width: "100%" }}
            />{" "}
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
            <button className="form-control btn btn-outline-success mb-3 ">
              Submit
            </button>
            <button className="form-control btn btn-danger">Cancel</button>
          </form>
        </div>
      </div>
    );
  }
}
