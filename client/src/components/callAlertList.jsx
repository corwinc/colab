import React from 'react';
import CallAlertOutgoing from './callAlertOutgoing.jsx';
import CallAlertIncoming from './callAlertIncoming.jsx';


const CallAlertList = ({isCaller, outgoingAlerts, incomingAlerts}) => {
  console.log("In call alert list, isCaller is ", isCaller);
  if (isCaller){ 
    return (
      <div className="call-alerts">
        { outgoingAlerts.map( (alert) => {
            return (
              <CallAlertOutgoing username={alert.username} key={alert.username}/>
            )
        })} 
      </div> 
    )
  } else { 
    return (
      <div className="call-alerts">
        { incomingAlerts.map( (alert) => {
            return (
              <CallAlertIncoming username={alert.username} key={alert.username} acceptOnclick={alert.acceptOnclick} rejectOnclick={alert.rejectOnclick}/>
            )
        })} 
      </div> 
    )
  }
};

export default CallAlertList;
