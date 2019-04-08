import { combineReducers } from 'redux';
import mySearchReducer from './mySearchReducer';
import userReducer from './userReducer';
import timetablesReducer from './timetablesReducer';

const rootReducer = combineReducers({
  mySearch: mySearchReducer,
  currentUser: userReducer,
  timetables: timetablesReducer
})

export default rootReducer;