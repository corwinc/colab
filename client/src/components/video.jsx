import React from 'react';

const AppVideo = () => {
	return (
    <div>
      <div className="vid-labels">
        <label htmlFor="localVideo" className="vid-left">Your Webcam Feed</label>
        <label htmlFor="remoteVideo" className="vid-right">Their Webcam Feed</label>
      </div>
      <div className="vid-box">        
        <div className="vid-left">
          <video id="localVideo" className="videoElement" autoPlay="true"></video>
        </div>
        <div className="vid-right">
        	<button id="acceptButton" className="incoming-call-button"> Accept Call </button>
        	<button id="rejectButton" className="incoming-call-button"> Reject Call </button>
          <video id="remoteVideo" className="videoElement" autoPlay="true"></video>
        </div>
      </div>
      <div className="button-row">
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
	);
}

export default AppVideo;