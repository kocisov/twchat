import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { render } from 'react-dom';
import { config } from 'dotenv';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import _createStore from './modules';
import Interface from './containers/Interface';
import Plugins from './containers/Plugins';
import './static/normalize.css';
import './static/index.css';

config();

const history = createHistory();
const store = _createStore(history);
const el = document.getElementById('root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Interface} />
        <Route path="/plugins" component={Plugins} />
      </div>
    </ConnectedRouter>
  </Provider>,
  el
);
