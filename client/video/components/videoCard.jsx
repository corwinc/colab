import React from 'react';

const VideoCard = ({stream, pcKey, hangupOnclick}) => {
  return (
    <div id={"vidBox___" + pcKey} className="vid-box">
      <video id={"remoteVideo___" + pcKey} src={ window.URL.createObjectURL(stream) } className="video-element" autoPlay="true" ></video>
        <div className="button-box">
          <img id={"stopButton___" + pcKey} className='stop-button' onClick={hangupOnclick} src="public/images/hangup.png"></img>
        </div>  
    </div> 
  )
};

export default VideoCard;
