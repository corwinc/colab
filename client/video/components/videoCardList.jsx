import React from 'react';
import VideoCard from './videoCard';

const VideoCardList = ({connections}) => {
  <div className="vid-scrollable-list">
    {connections.map( (connection) => {
      <VideoCard src={connection.stream} pcKey={connection.pcKey} key={connection.id}/>
    })};
  </div>  
};

export default VideoCardList;