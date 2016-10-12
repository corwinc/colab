const initialState = {
  pcKey: '',
  username: ''
};

const callAlert = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_OUTGOING_ALERTS':
    case 'SHOW_INCOMING_ALERTS':
      return {
        pcKey: action.pcKey,
        username: action.username,
        acceptOnclick: action.acceptOnclick, 
        rejectOnclick: action.rejectOnclick
      }
    case 'HIDE_ALERT':
      return {}  
    default:
      return state
  }
}

const deleteAlert = (alertsCopy, pcKey)=>{
  for (var i = 0; i < alertsCopy.length; i++) {
    if (alertsCopy[i].pcKey === pcKey) {
      alertsCopy.splice(i, i + 1);
    }
  }
  return alertsCopy;
};

export default function(state = {}, action) {
  switch (action.type) {
    case 'SHOW_OUTGOING_ALERTS':
      var prevAlerts = state.outgoingAlerts || [];
      return Object.assign({}, state, {
        outgoingAlerts: [...prevAlerts, callAlert(null, action)]
      });
    case 'SHOW_INCOMING_ALERTS':
      var prevAlerts = state.incomingAlerts || [];
      return Object.assign({}, state, {
        incomingAlerts: [...prevAlerts, callAlert(null, action)]
      });
    case 'DELETE_OUTGOING_ALERT':
      var alertsCopy = state.outgoingAlerts.slice();
      return Object.assign({}, state, {
        outgoingAlerts: deleteAlert(alertsCopy, action.pcKey)
      });
    case 'DELETE_INCOMING_ALERT':
      var alertsCopy = state.incomingAlerts.slice();
      return Object.assign({}, state, {
        incomingAlerts: deleteAlert(alertsCopy, action.pcKey)
      });
    case 'SHOW_INCOMING_CALL_OPTIONS':
      return Object.assign({}, state, {
        shouldShow: action.shouldShow
      }) 
    default:
      return state;
  }
}