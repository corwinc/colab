import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './rootReducer.jsx';
import routes from './app.routes.jsx';
import promise from 'redux-promise';
import createLogger from 'redux-logger';


const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    { routes }
  </Provider>
  , document.querySelector('.app')
);
