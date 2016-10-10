import React from 'react';

const OutgoingCallAlert = ({username, acceptOnclick}) => {
  console.log("$$$$$ create outgoing call alerts");
  return (
    <div className="call-alerts-outgoing">
      <img id="callIcon" className="call-icon icon-spin" src="public/images/callwaiting.svg"></img>
      <span className="call-message"> { "Waiting for a response from " + username + "..." }</span>
    </div> 
  )
};

export default OutgoingCallAlert;


// import React from 'react';

// const CallAlerts = () => {
//   <div className="call-alerts"> 
//     <div className="call-alerts-outgoing">
//       <img id="callIcon" className="call-icon" src="public/images/callwaiting.svg"></img>
//       <span className="call-message"> Waiting for a response... </span>
//     </div> 
//     <div className="call-alerts-incoming">
//       <div className="call-incoming-notifications">
//         <img id="seeOptionsIcon" className="call-icon" src="public/images/callwaiting.svg"></img>
//         <span className="call-message"> Incoming call... </span>
//       </div>
//       <div className="call-incoming-options">
//         <div id="acceptIcon">
//           <img className="call-mini-icon" src="public/images/call.png"></img>
//           Accept
//         </div>
//         <div id="rejectIcon">
//           <img className="call-mini-icon" src="public/images/rejectcall.png"></img>
//           Reject
//         </div>
//       </div>
//     </div>
//   </div> 
// };



// export default CallAlerts;








// function showIncomingCallAlerts(pcKey, signalingChannel, successCallback, errorCallback){
//   console.log("IN showIncomingCallAlerts, PCKEY IS: ", pcKey)

//   $('#acceptIcon').unbind().on('click', function(){
//     context.pcs[pcKey].createAnswer(successCallback, errorCallback);
//   });
//   $('#rejectIcon').unbind().on('click', function(){
//     signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey}));
//   });
// }





// toggleAlertViewState(isCaller, pcKey) {
//   $('.call-alerts').toggle();
//   isCaller ? toggleOutgoingState() : toggleIncomingState();

//   function toggleOutgoingState(){
//     console.log("toggling OUTGOING state");
//     $('.call-alerts-outgoing').toggle();
//     animateIcon('#callIcon', 'icon-spin');
//   }

//   function toggleIncomingState(){
//     console.log("toggling incoming state")

//     $('.call-alerts-incoming').toggle();
//     $('.call-incoming-notifications').toggle();
//     animateIcon('#seeOptionsIcon', 'icon-flash');
//     $('#seeOptionsIcon').unbind().on('mouseover', function(){
//       $('.call-incoming-notifications').css('display', 'inline-block');
//       $('.call-incoming-options').css('display', 'inline-block');
//     })
//   }

//   function animateIcon(iconId, iconClass){
//     $(iconId).addClass(iconClass);
//   };

// }

