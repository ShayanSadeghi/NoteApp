import {
  GET_USER_PROFILE,
  SET_USER_PROFILE,
  REMOVE_USER_PROFILE,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return action.payload;
    case SET_USER_PROFILE:
      return action.payload;
    case REMOVE_USER_PROFILE:
      return {
        ...state,
        image: null,
      };
    default:
      return state;
  }
}
