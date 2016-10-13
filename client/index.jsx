import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './rootReducer.jsx';
import routes from './app.routes.jsx';
import promise from 'redux-promise';

// //if you want to use logger() to see all the states get updates 
// //into the browser console then these three lines of code.
//   //@Redux-logger
  
  import createLogger from 'redux-logger';



  const logger = createLogger();

  const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore);
  
  //@


//if you want to use redux devtool then use these 4 lines of code below:-

//@Redux-devtool

// const createStoreWithMiddleware = compose(
// 	applyMiddleware(thunk),
// 	window.devToolsExtension ? window.devToolsExtension() : f => f
// 	)(createStore);

//@

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    { routes }
  </Provider>
  , document.querySelector('.app')
);
