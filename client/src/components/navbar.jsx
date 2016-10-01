import React from 'react';

const NavBar = () => 
  (
    <div className="NavBarWrapper">
      <div className="NavBarContainer">
        <div className="userCircles">
          <div className="userCircle"></div>
          <div className="userCircle"></div>
          <div className="userCircle"></div>
          <div className="userCircle"></div>
        </div>
        <button id="callNavButton">Call</button>
        <button className="btn-info">Share</button>
        <a href="http://localhost:8000/" className="logout">logout</a>
      </div>
    </div>
  );
export default NavBar;