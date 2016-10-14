import React from 'react';
import CallAlertOutgoing from './callAlertOutgoing.jsx';
import CallAlertIncoming from './callAlertIncoming.jsx';

// If the user is the caller, show a list of outgoing call alerts; if the user is the callee, show a list of incoming call alerts. 
const CallAlertList = ({isCaller, outgoingAlerts, incomingAlerts}) => {
  if (isCaller){ 
    return (
      <div className="call-alerts">
        { outgoingAlerts.map( (alert) => {
            return (
              <CallAlertOutgoing key={alert.username}/>
            )
        })} 
      </div> 
    )
  } else { 
    return (
      <div className="call-alerts">
        { incomingAlerts.map( (alert) => {
            return (
              <CallAlertIncoming key={alert.username} acceptOnclick={alert.acceptOnclick} rejectOnclick={alert.rejectOnclick}/>
            )
        })} 
      </div> 
    )
  }
};

export default CallAlertList;
