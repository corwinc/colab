import React from 'react';

// Video cards show the remote peer's video.
const VideoCard = ({stream, pcKey, hangupOnclick}) => {
  return (
    <div id={"vidBox___" + pcKey} className="vid-box">
      <video id={"remoteVideo___" + pcKey} src={ window.URL.createObjectURL(stream) } className="video-element" autoPlay="true" muted></video>
        <div className="button-box">
          <img id={"stopButton___" + pcKey} className='stop-button' onClick={hangupOnclick} src="public/images/hangup.png"></img>
        </div>  
    </div> 
  )
};

export default VideoCard;
