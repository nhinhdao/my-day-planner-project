import { combineReducers } from 'redux';
import mySearchReducer from './mySearchReducer';
import userReducer from './userReducer';
import savedPlacesReducer from './savedPlacesReducer';
import timetablesReducer from './timetablesReducer';

const rootReducer = combineReducers({
  mySearch: mySearchReducer,
  currentUser: userReducer,
  savedPlaces: savedPlacesReducer,
  timetables: timetablesReducer
})

export default rootReducer;