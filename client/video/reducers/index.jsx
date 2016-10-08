import { combineReducers } from 'redux'
import peerConnections from './peerConnections'
import alerts from './alerts'

const vidApp = combineReducers({
  peerConnections,
  alerts
});

export default todoApp