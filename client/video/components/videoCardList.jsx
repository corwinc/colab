import React from 'react';
import VideoCard from './videoCard';

const VideoCardList = ({connections, streams}) => {
  <div className="vid-scrollable-list">
    { 
      for (var pcKey in connections) {
        <VideoCard stream={streams[connections.pcKey]} pcKey={connections.pcKey} key={pcKey} id={"#vidBox___" + pcKey}/>
      }
    }
  </div>  
};

export default VideoCardList;

// {connections.map( (connection) => {
//   <VideoCard stream={streams[connection.pcKey]} pcKey={connection.pcKey} key={connection.id}/>
// })};