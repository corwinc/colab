import React from 'react';

const VideoCard = ({stream, pcKey}) => {
  <div id={"vidBox___" + pcKey} className="vid-box">
    <video id={"remoteVideo___" + pcKey} src={ stream } className="video-element" autoPlay="true" muted></video>
      <div className="button-box">
        <img id={"stopButton___" + pcKey}  className='stop-button' src="public/images/hangup.png"></img>
      </div>  
  </div> 
};

export default VideoCard;