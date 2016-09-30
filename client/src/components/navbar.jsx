import React from 'react';

// Later: on componentDidMount: get shared users and render circles

const NavBar = () => 
  (
    <div>
      <div className="NavBarContainer">
        <div className="userCircles">
          <div className="userCircle"></div>
          <div className="userCircle"></div>
          <div className="userCircle"></div>
          <div className="userCircle"></div>
        </div>
        <button className="btn-info">Share</button>
        <a href="http://localhost:8000/" className="logout">logout</a>
      </div>
    </div>
  );
export default NavBar;