import { GET_USER_NOTES } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_NOTES:
      return action.payload;
    default:
      return state;
  }
}
