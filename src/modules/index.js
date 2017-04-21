import thunk from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { routerReducer, routerMiddleware } from 'react-router-redux';

import client from './client';
import messages from './messages';
import mount from './mount';
import msgs from './msgs';
import plugins from './plugins';
import viewers from './viewers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducers = {
  client,
  messages,
  mount,
  msgs,
  plugins,
  viewers,
};

export default history => {
  const middleware = [routerMiddleware(history), thunk];

  let _md;

  if (process.env.NODE_ENV !== 'production') {
    _md = composeEnhancers(applyMiddleware(...middleware));
  } else {
    _md = applyMiddleware(...middleware);
  }

  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
    }),
    _md
  );
};
