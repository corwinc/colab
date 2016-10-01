import React from 'react';

const AppVideo = () => {
	return (
    <div className="call-views">
      <div className="call-alerts"> 
        <div className="call-alerts-outgoing">
          <img id="callIcon" className="call-icon" src="public/images/callwaiting.svg"></img>
        </div> 
        <div className="call-alerts-incoming">
          <img id="acceptIcon" className="call-icon" src="public/images/call2.png"></img>
          <img id="rejectIcon" className="call-icon" src="public/images/rejectcall.png"></img>
        </div>
      </div>   
      <div className="vid-box">
        <video id="remoteVideo" className="video-element" autoPlay="true" muted></video>
        <div className="player-button-row">
          <div className="button-box">
            <button id="startButton" className="left-bottom-curve">Start</button>
          </div>  
          <div className="button-box">
            <button id="stopButton" className="right-bottom-curve">Hang Up</button>
          </div>  
        </div>
      </div>
    </div>
	);
}

export default AppVideo;