const initialState = {
  pc: null,
  pcKey: ''
};

const peerConnection = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PEER_CONNECTION':
      return {
        pcKey: action.pcKey,
        pc: action.pc,
        hangupOnclick: action.hangupOnclick
      }
    default:
      return state
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case 'ADD_PEER_CONNECTION':
      var prevVideos = state.connections || [];
      return Object.assign({}, state, {
        connections: [...prevVideos, peerConnection(null, action)]
      });
    case 'REMOVE_PEER_CONNECTION':
      var connsCopy = state.connections.slice();
      for (var i = 0; i < connsCopy.length; i++) {
        if (connsCopy[i].pcKey === action.pcKey) {
          connsCopy.splice(i, i + 1);
        }
      }
      return Object.assign({}, state, {
        connections: connsCopy
      });
    case 'SET_START_CALL':
      return Object.assign({}, state, {
        startCall: action.startCall
      })
    case 'SET_START_CONFERENCE_CALL':
      return Object.assign({}, state, {
        startConferenceCall: action.startConferenceCall
      })  
    default:
      return state;
  }
}
