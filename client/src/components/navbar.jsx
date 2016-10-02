import React from 'react';

// STATEFUL B/C ADDING COMPONENTWILLMOUNT
export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
  };

  componentWillMount() {
    var docId = this.props.curDoc;
    var userId = this.props.curUser;
    // this is probably going to have asynchronous issues => refactor to cbs or promises
    var sharedUsers = this.props.getSharedUsers(docId, userId);
    console.log('shared users have been had:', sharedUsers);
    this.props.setSharedUsersState(sharedUsers);
  }

  render() {
    return (
      <div className="NavBarWrapper">
        <div className="NavBarContainer">
          <div className="userCircles">
          {this.props.curSharedUsers.map((user, i) => {
            var initials = this.props.getInitials(user); 
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
  }
};


// STATELESS VERSION
// const NavBar = (props) => 
//   (
//     <div className="NavBarWrapper">
//       <div className="NavBarContainer">
//         <div className="userCircles">
//         {props.curSharedUsers.map((user, i) => {
//           var initials = props.getInitials(user); 
//           return <div key={i} className='userCircle'>{initials}</div>
//         })}
//         </div>
//         <div className="nav-bar-buttons">
//           <img id="call-nav-button" src="public/images/makecall.png"></img>
//           <button>Share</button>
//           <a href="http://localhost:8000/">logout</a>
//         </div>
//       </div>
//     </div>
//   );
// export default NavBar;

