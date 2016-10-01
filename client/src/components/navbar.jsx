import React from 'react';

// Later: on componentDidMount: get shared users and render circles

const NavBar = (props) => 
  (
    <div className="NavBarWrapper">
      <div className="NavBarContainer">
        <div className="userCircles">
        {props.curSharedUsers.map((user, i) => {
          var initials = props.getInitials(user); 
          return <div key={i} className='userCircle'>{initials}</div>
        })}
        </div>
        <div className="nav-bar-buttons">
          <img id="call-nav-button" src="public/images/makecall.png"></img>
          <button>Share</button>
          <a href="http://localhost:8000/">logout</a>
        </div>
      </div>
    </div>
  );
export default NavBar;


          // <div className="userCircle"></div>
          // <div className="userCircle"></div>
          // <div className="userCircle"></div>
          // <div className="userCircle"></div>