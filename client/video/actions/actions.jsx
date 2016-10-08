export const toggleCallAlerts = (isCaller, pcKey) => {
  return {
    type: 'TOGGLE_CALL_ALERTS',
    isCaller, 
    pcKey
  }
}

export const addPeerConnection = (pcKey, setting) => {
  return {
    type: 'ADD_PEER_CONNECTION',
    pcKey
  }
}

export const removePeerConnection = (pcKey) => {
  return {
    type: 'REMOVE_PEER_CONNECTION',
    pcKey
  }
}

