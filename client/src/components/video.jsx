import React from 'react';

const AppVideo = () => {
	return (
    <div>
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
          <video id="remoteVideo" className="videoElement" autoPlay="true"></video>
          <div className="player-button-row">
            <div className="button-box">
              <button id="startButton">Start</button>
            </div>  
            <div className="button-box">
              <button id="callButton">Call</button>
            </div>
            <div className="button-box">
              <button id="stopButton">Hang Up</button>
            </div>  
          </div>
        </div>
      </div>
    </div>
	);
}

export default AppVideo;