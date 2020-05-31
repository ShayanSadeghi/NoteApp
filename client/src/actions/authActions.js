import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(() => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      // Set token to local-storage
      localStorage.setItem("jwtToken", token);
      // set token to axios auth header
      setAuthToken(token);
      // Decode token
      const decodedUser = jwt_decode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decodedUser,
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Logout User
export const logoutUser = () => dispatch => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
