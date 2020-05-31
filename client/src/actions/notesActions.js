import axios from "axios";

import { GET_USER_NOTES, GET_ERRORS } from "./types";

export const getUserNotes = () => dispatch => {
  axios
    .get("/api/notes")
    .then(res => {
      dispatch({
        type: GET_USER_NOTES,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
