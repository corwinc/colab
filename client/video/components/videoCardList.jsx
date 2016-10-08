import React from 'react';
import VideoCard from './videoCard';

const VideoCardList = ({connections, streams}) => {
  <div className="vid-scrollable-list">
    {connections.map( (connection) => {
      <VideoCard stream={streams[connection.pcKey]} pcKey={connection.pcKey} key={connection.id}/>
    })};
  </div>  
};

export default VideoCardList;