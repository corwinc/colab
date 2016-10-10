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
      var prevVideos = state.videoList ? state.videoList.pcs : [];
      return Object.assign({}, state, {
        connections: [...prevVideos, peerConnection(null, action)]
      });
    case 'REMOVE_PEER_CONNECTION':
      var newState = {};
      for (var pcKey in state){
        if (state.pcKey !== action.pcKey) {
          newState.pcKey = state.pcKey;
        }
      }
      return newState;
    default:
      return state;
  }
}
