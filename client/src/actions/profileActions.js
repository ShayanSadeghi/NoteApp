import axios from "axios";

import { GET_USER_PROFILE, SET_USER_PROFILE, GET_ERRORS } from "./types";

export const getUserProfile = () => dispatch => {
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_USER_PROFILE,
        payload: res.data[0],
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};

export const setUserProfile = (userProfile, isNew) => dispatch => {
  if (isNew) {
    axios
      .post("/api/profile", userProfile)
      .then(res => {
        dispatch({
          type: SET_USER_PROFILE,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      });
  } else {
    axios
      .put("/api/profile", userProfile)
      .then(res => {
        dispatch({
          type: SET_USER_PROFILE,
          payload: res.data,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      });
  }
};
