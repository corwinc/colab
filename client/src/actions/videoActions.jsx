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
  console.log("reached action for show outgoing alert.");
  return {
    type: 'SHOW_OUTGOING_ALERTS', 
    pcKey: pcKey, 
    username: username, 
    acceptOnclick: null, 
    rejectOnclick: null
  }  
};

export function deleteOutgoingAlert(pcKey) {
  console.log("reached action for outgoing alert.");
  return {
    type: 'DELETE_OUTGOING_ALERT', 
    pcKey: pcKey
  }  
};

export function deleteIncomingAlert(pcKey) {
  console.log("reached action for incoming alert.");
  return {
    type: 'DELETE_INCOMING_ALERT', 
    pcKey: pcKey
  }  
};