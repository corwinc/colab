import React from 'react';
import VideoCard from './videoCard.jsx';

const VideoCardList = ({connections, streams}) => {
  return (
    <div className="vid-scrollable-list">
      { connections.map( (connection) => {
        return (<VideoCard  stream={ streams[connection.pcKey] } 
                            pcKey={ connection.pcKey } 
                            hangupOnclick= { connection.hangupOnclick }
                            key={ connection.pcKey } 
                            id={"vidBox___" + connection.pcKey} />)
      }) }
    </div>
  ); 
};

export default VideoCardList;
