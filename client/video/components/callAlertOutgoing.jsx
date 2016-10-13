import React from 'react';

const OutgoingCallAlert = ({acceptOnclick}) => {
  return (
    <div className="call-alerts-outgoing">
      <img id="callIcon" className="call-icon icon-spin" src="public/images/callwaiting.svg"></img>
      <span className="call-message"> { "Waiting for a response..." }</span>
    </div> 
  )
};

export default OutgoingCallAlert;

