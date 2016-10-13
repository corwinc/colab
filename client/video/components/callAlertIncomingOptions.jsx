import React from 'react';
const hidden = {display: "none"};

// Incoming call options show the accept and reject call icons in the case of a direct call. 
const IncomingCallOptions = ({shouldShow, acceptOnclick, rejectOnclick}) => { 
  if (shouldShow) {
    return ( 
      <div className="call-incoming-options">
        <div id="acceptIcon">
          <img className="call-mini-icon" src="public/images/call.png" onClick={acceptOnclick}></img>
          Accept
        </div>
        <div id="rejectIcon">
          <img className="call-mini-icon" src="public/images/rejectcall.png" onClick={rejectOnclick}></img>
          Reject
        </div>
      </div>
    );
  } else {
    return (
      <div style={hidden}></div>
    );
  }
};

export default IncomingCallOptions;