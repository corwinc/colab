import React from 'react';

// Later: on componentDidMount: get shared users and render circles

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
        <div className="nav-bar-buttons">
          <button>Share</button>
          <a href="http://localhost:8000/">logout</a>
        </div>
      </div>
    </div>
  );
export default NavBar;