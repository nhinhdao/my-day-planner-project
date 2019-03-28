import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import mySearchReducer from './reducers/mySearchReducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
require('dotenv').config();

const store = createStore(mySearchReducer, applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();