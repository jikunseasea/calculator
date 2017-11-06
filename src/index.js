import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';

import 'github-fork-ribbon-css/gh-fork-ribbon.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './containers/app';
import reducer from './reducers'

import './index.css';

const middlewares = [];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

