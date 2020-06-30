import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import noteReducer from "./noteReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  notes: noteReducer,
  profile: profileReducer,
  errors: errorReducer,
});
