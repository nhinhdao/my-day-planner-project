import { combineReducers } from 'redux';
import mySearchReducer from './mySearchReducer';
import recommendedReducer from './recommendedReducer';
import wishlistReducer from './wishlistReducer';
import singleSearchReducer from './singleSearchReducer'

const rootReducer = combineReducers({
  mySearch: mySearchReducer,
  recommendedSearch: recommendedReducer,
  singleSearch: singleSearchReducer,
  wishlist: wishlistReducer
})

export default rootReducer;