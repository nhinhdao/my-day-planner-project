import { combineReducers } from 'redux';
import mySearchReducer from './mySearchReducer';
import recommendedReducer from './recommendedReducer';
import wishlistReducer from './wishlistReducer';
import singleSearchReducer from './singleSearchReducer'
import reviewSearchReducer from './reviewSearchReducer';

const rootReducer = combineReducers({
  mySearch: mySearchReducer,
  recommendedSearch: recommendedReducer,
  singleSearch: singleSearchReducer,
  reviewsSearch: reviewSearchReducer,
  wishlist: wishlistReducer
})

export default rootReducer;