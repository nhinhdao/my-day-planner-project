import { combineReducers } from 'redux';
import mySearchReducer from './mySearchReducer';
import reviewSearchReducer from './reviewSearchReducer';

const rootReducer = combineReducers({
  mySearch: mySearchReducer,
  reviewsSearch: reviewSearchReducer
})

export default rootReducer;