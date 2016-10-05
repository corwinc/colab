import React from 'react';

const AppVideo = () => {
	return (
    <div className="call-views">

      <div className="call-alerts"> 
        <div className="call-alerts-outgoing">
          <img id="callIcon" className="call-icon" src="public/images/callwaiting.svg"></img>
          <span className="call-message"> Waiting for a response... </span>
        </div> 
        <div className="call-alerts-incoming">
          <div className="call-incoming-notifications">
            <img id="seeOptionsIcon" className="call-icon" src="public/images/callwaiting.svg"></img>
            <span className="call-message"> Incoming call... </span>
          </div>
          <div className="call-incoming-options">
            <div id="acceptIcon">
              <img className="call-mini-icon" src="public/images/call.png"></img>
              Accept
            </div>
            <div id="rejectIcon">
              <img className="call-mini-icon" src="public/images/rejectcall.png"></img>
              Reject
            </div>
          </div>
        </div>
      </div>   

      <div className="vid-box">
        <video id="remoteVideo1" className="video-element" autoPlay="true" muted></video>
        <div className="player-button-row"> 
          <div className="button-box">
            <img id="stopButton" src="public/images/hangup.png"></img>
          </div>  
        </div>
      </div>

    </div>
	);
}

export default AppVideo;