import axios from "axios";

import { GET_USER_NOTES, GET_ERRORS, CLEAR_NOTES } from "./types";

//Get current user notes
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

//Save note
export const saveNote = noteData => dispatch => {
  axios.post("/api/notes", noteData);
};

//Update note
export const updateNote = (noteData, noteId) => dispatch => {
  axios.put(`/api/notes/${noteId}`, noteData);
};

//Delete a note
export const deleteNote = noteId => dispatch => {
  axios.delete(`/api/notes/${noteId}`).then(() => {
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
  });
};

//Clear notes
export const clearNotes = () => {
  return {
    type: CLEAR_NOTES,
  };
};
