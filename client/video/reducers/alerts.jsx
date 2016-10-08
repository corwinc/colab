const alert = (state = 'HIDE_ALL', action) => {
  switch (action.type) {
    case 'TOGGLE_CALL_ALERTS':
      return action.setting;
    default:
      return state
  }
}

const alerts = (state = [], action) => {
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

export default alerts