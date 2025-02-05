import { combineReducers } from "redux";
import globalReducer from '../modules/global/slice';

const rootReducers = combineReducers({
  global: globalReducer,
});

export default rootReducers;
