// import React from 'react'
// import { render } from 'react-dom'
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import todoApp from './reducers'
// import App from './components/App'

import { combineReducers } from 'redux'
import peerConnections from './peerConnections'

const vidApp = combineReducers({
  peerConnections
});

export default todoApp