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

export default function(state = {}, action) {
  console.log("REDUCING ALERT LIST");
  switch (action.type) {
    case 'SHOW_OUTGOING_ALERTS':
      console.log("SHOW OUTGOING PUPPY")
      var prevAlerts = state.alertList ? state.alertList.outgoingAlerts : [];
      return Object.assign({}, state, {
        outgoingAlerts: [...prevAlerts, callAlert(null, action)]
      });
    case 'SHOW_INCOMING_ALERTS':
      console.log("SHOW INCOMING KITTEN")

      var prevAlerts = state.alertList ? state.alertList.incomingAlerts : [];
      return Object.assign({}, state, {
        incomingAlerts: [...prevAlerts, callAlert(null, action)]
      });
    case 'DELETE_OUTGOING_ALERT':
      var newState = {};
      for (var pcKey in state){
        if (state.pcKey !== action.pcKey) {
          newState.pcKey = state.pcKey;
        }
      }
      return newState;
    case 'DELETE_INCOMING_ALERT':
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