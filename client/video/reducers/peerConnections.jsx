const peerConnection = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_PEER_CONNECTION':
      return {
        pcKey: action.pcKey,
        isCaller: action.isCaller
      }
    case 'REMOVE_PEER_CONNECTION':
      if (state.pcKey !== action.pcKey) {
        return state;
      }
      // if (true) {
      //   return Object.assign({}, state, {
      //     completed: !state.completed
      //   })
      // }

    default:
      return state
  }
}

const peerConnections = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PEER_CONNECTION':
      return [
        ...state,
        peerConnection(undefined, action)
      ]
    case 'REMOVE_PEER_CONNECTION':
      return state.map(pcState =>
        todo(pcState, action);
      )
    default:
      return state
  }
}

export default todos