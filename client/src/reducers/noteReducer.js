import { GET_USER_NOTES, CLEAR_NOTES } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_NOTES:
      return action.payload;
    case CLEAR_NOTES:
      return null;
    default:
      return state;
  }
}
