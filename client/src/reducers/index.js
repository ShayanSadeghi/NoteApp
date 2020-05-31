import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import noteReducer from "./noteReducer";

export default combineReducers({
  auth: authReducer,
  notes:noteReducer,
  errors: errorReducer,
});
