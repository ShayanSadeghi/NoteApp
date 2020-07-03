import axios from "axios";

import {
  GET_USER_PROFILE,
  SET_USER_PROFILE,
  REMOVE_USER_PROFILE,
  GET_ERRORS,
} from "./types";

//Get user profile data
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

// Create or Update user profile
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
        dispatch({
          type: GET_ERRORS,
          payload: err,
        });
      });
  }
};

//Upload profile picture
export const uploadProfilePicture = file => dispatch => {
  let bodyFormData = new FormData();
  bodyFormData.append("inputFile", file);
  axios({
    method: "post",
    url: "/api/profile/upload",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(res => {
      dispatch({
        type: SET_USER_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    });
};

//Remove profile picture
export const removeProfilePicture = fileId => dispatch => {
  axios
    .delete(`/api/profile/files/${fileId}`)
    .then(res => {
      dispatch({
        type: REMOVE_USER_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
      console.log(err);
    });
};
