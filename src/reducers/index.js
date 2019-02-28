import { combineReducers } from 'redux';
import mySearchReducer from './mySearchReducer';
import recommendedReducer from './recommendedReducer';
import reviewSearchReducer from './reviewSearchReducer';

const rootReducer = combineReducers({
  mySearch: mySearchReducer,
  recommendedSearch: recommendedReducer,
  reviewsSearch: reviewSearchReducer
})

export default rootReducer;