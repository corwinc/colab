import React from 'react';

const OutgoingCallAlert = ({username, acceptOnclick}) => {
  console.log("$$$$$ create outgoing call alerts");
  return (
    <div className="call-alerts-outgoing">
      <img id="callIcon" className="call-icon icon-spin" src="public/images/callwaiting.svg"></img>
      <span className="call-message"> { "Waiting for a response from " + username + "..." }</span>
    </div> 
  )
};

export default OutgoingCallAlert;

