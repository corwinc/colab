export function addPeerConnection(pcKey, pc, hangupOnclick) {
  return {
    type: 'ADD_PEER_CONNECTION',
    pcKey: pcKey, 
    pc: pc,
    hangupOnclick: hangupOnclick 
  }
};

export function removePeerConnection(pcKey) {
  return {
    type: 'REMOVE_PEER_CONNECTION',
    pcKey: pcKey
  }
};

export function showIncomingAlerts(pcKey, username, acceptOnclick, rejectOnclick) {
  return {
    type: 'SHOW_INCOMING_ALERTS', 
    pcKey: pcKey, 
    username: username, 
    acceptOnclick: acceptOnclick, 
    rejectOnclick: rejectOnclick
  }
};

export function showOutgoingAlerts(pcKey, username) {
  return {
    type: 'SHOW_OUTGOING_ALERTS', 
    pcKey: pcKey, 
    username: username, 
    acceptOnclick: null, 
    rejectOnclick: null
  }  
};

export function deleteOutgoingAlert(pcKey) {
  return {
    type: 'DELETE_OUTGOING_ALERT', 
    pcKey: pcKey
  }  
};

export function deleteIncomingAlert(pcKey) {
  return {
    type: 'DELETE_INCOMING_ALERT', 
    pcKey: pcKey
  }  
};

export function showIncomingCallOptions(shouldShow) {
  return {
    type: 'SHOW_INCOMING_CALL_OPTIONS', 
    shouldShow: shouldShow
  }
};

export function setStartCall(startCall) {
  return {
    type: 'SET_START_CALL', 
    startCall: startCall
  }
};