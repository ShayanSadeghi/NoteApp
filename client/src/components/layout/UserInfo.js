import React, { Component } from "react";
import { connect } from "react-redux";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

import { getUserProfile } from "../../actions/profileActions";

class UserInfo extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  onNewNoteClick(e) {
    this.props.history.push("/newNote");
  }

  render() {
    const { user } = this.props;
    return (
      <div className=" container mb-4 d-inline-block w20rem">
        <div className="mr-auto card border border-dark p-3 w18rem">
          <div className="card-body">
            {this.props.profile.image && (
              <img
                src={`/api/profile/image/${this.props.profile.image}`}
                alt="user"
                className="card-img-top rounded-circle"
              />
            )}
            <p className="card-title">
              <UserOutlined size="large" />
              {this.props.profile.fname || this.props.profile.lname
                ? this.props.profile.fname + " " + this.props.profile.lname
                : user.name}
            </p>
            <a>
              <MailOutlined />
              {user.email}
            </a>
            <p>
              <PhoneOutlined /> {this.props.profile.phone}
            </p>
            <p>
              <EnvironmentOutlined /> {this.props.profile.address}
            </p>
            <p>
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                class="bi bi-briefcase"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6h-1v6a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-6H0v6z"
                />
                <path
                  fill-rule="evenodd"
                  d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5v2.384l-7.614 2.03a1.5 1.5 0 0 1-.772 0L0 6.884V4.5zM1.5 4a.5.5 0 0 0-.5.5v1.616l6.871 1.832a.5.5 0 0 0 .258 0L15 6.116V4.5a.5.5 0 0 0-.5-.5h-13zM5 2.5A1.5 1.5 0 0 1 6.5 1h3A1.5 1.5 0 0 1 11 2.5V3h-1v-.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V3H5v-.5z"
                />
              </svg>
              {this.props.profile.job}
            </p>
            <p>
              <CalendarOutlined />
              {this.props.profile.birthdate}
            </p>
            <button
              className="btn btn-success d-block mb-2"
              onClick={this.onNewNoteClick.bind(this)}>
              New Note
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => this.props.history.push("/profile")}>
              Profile
            </button>
            <button
              onClick={() => this.props.history.push("/stats")}
              className="btn btn-sm btn-outline-secondary">
              Stats
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getUserProfile })(UserInfo);
