import React from 'react';
import VideoCardList from './videoCardList';
import CallAlerts from './callAlerts';

// Container for video components.
export default class AppVideo extends React.Component {

  constructor(props){
    super(props);
    this.configuration = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
    this.pcs = {};
    this.userIds = {};
    this.signalingChannel = io('/video');
    
    this.signalingChannel.on('message', function(evt) {
      var signal = JSON.parse(evt);
      if (isConnectionAlreadyMade(signal.pcKey)) {
        console.log("You are already connected to this user.");
        return;
      }
      var users = signal.pcKey.split('---');
      if (myId == users[0].toString() || myId == users[1].toString()){
        if (areYouSignalingYourself(signal.callerId)){
          return;
        }
        if (!pcs[signal.pcKey]) {
          start(false, signal.pcKey, signal.mode);
        } 
        if (signal.sdp) {
          pcs[signal.pcKey].setRemoteDescription(new RTCSessionDescription(signal.sdp));
        } else if (signal.candidate) {
          pcs[signal.pcKey].addIceCandidate(new RTCIceCandidate(signal.candidate));
        }
      } 
    });

    this.signalingChannel.on('disconnect call', function(evt){
      var signal = JSON.parse(evt);
      pcs[signal.pcKey].close();
      delete pcs[signal.pcKey];
      var remoteVideo = document.querySelector("#remoteVideo___" + signal.pcKey);
      remoteVideo.src = undefined;

      $('#vidBox___' + signal.pcKey).remove();
      $('.call-incoming-options').hide();

      if ($('.vid-box').length === 1) {
        $('.call-views').hide();
      }
    });

    this.signalingChannel.on('initialize conference call', function(evt) {
      var signal = JSON.parse(evt);
      var meshGrid = signal.meshGrid;
      var myCallsToMake = meshGrid[myId];
      if (myCallsToMake !== undefined) {
        myCallsToMake.forEach(function(pcKey, i){
          setTimeout(function(){
            initSingleCall(pcKey, 'conference call');
            console.log(new Date())
          }, i * 50);
        });
      }
    });
  }

  start(isCaller, pcKey, mode) {
    store.dispatch()
    /*
    1. Create new peer connection
    2. Configure new peer connection
    3. 
    4. 
    5. 
    6. 

    */
  }

  start(isCaller, pcKey, mode){
    pcs[pcKey] = new RTCPeerConnection(this.configuration);
    pcs[pcKey].onicecandidate = function (evt) {
      signalingChannel.emit('send candidate', JSON.stringify({ "candidate": evt.candidate, "isCaller": isCaller, "callerId": myId, "pcKey": pcKey, "mode": mode }));
    };
    pcs[pcKey].onaddstream = function (evt) {
      showRemoteVideo(evt, isCaller, pcKey, remoteVideo);
    };
    function showRemoteVideo(evt, isCaller, pcKey, video) {
      pcs[pcKey].status = 'connected';
      video.src = window.URL.createObjectURL(evt.stream);
      $('.call-alerts-outgoing').hide();
      $('.call-views').show();
      if (isCaller) {
        $('#vidBox___' + pcKey).show();
      }
    };
    var handleVideo = function (stream) {
      pcs[pcKey].addStream(stream);

      if (isCaller) {
        pcs[pcKey].createOffer(gotDescription, errorGettingDescription);
      } else {
        if (mode === 'direct call') {
          showIncomingCallAlerts(pc, pcKey, signalingChannel, gotDescription, errorGettingDescription);
        } 
        if (mode === 'conference call') {
          pcs[pcKey].createAnswer(gotDescription, errorGettingDescription);
        }
      }

        function showIncomingCallAlerts(pc, pcKey, signalingChannel, successCallback, errorCallback){
          $('.call-views').show();
          $('.call-alerts-incoming').show();
          $('.call-incoming-notifications').show();

          animateIcon('#seeOptionsIcon', 'icon-flash');

          $('#seeOptionsIcon').unbind().on('mouseover', function(){
            $('.call-incoming-notifications').css('display', 'inline-block');
            $('.call-incoming-options').css('display', 'inline-block');
          })

          $('#acceptIcon').unbind().on('click', function(){
            pcs[pcKey].status = 'connected';
            $('.call-alerts-incoming').hide();
            pcs[pcKey].createAnswer(successCallback, errorCallback);
            $('#vidBox___' + pcKey).show();
          });

          $('#rejectIcon').unbind().on('click', function(){
            $('.call-alerts-incoming').hide();
            $('.call-incoming-options').hide();
            signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey}));
          });
        }

        function gotDescription(desc) {
          pcs[pcKey].setLocalDescription(desc);
          signalingChannel.emit('send offer', JSON.stringify({ "sdp": desc, "callerId": myId, "pcKey": pcKey, "mode": mode}));
        };

        function errorGettingDescription(err) {
          console.log("There was an error getting the description. Error message: ", err);
        };
    };

    var videoError = function (error) {
      console.log("ERROR! ", error)
    };

    navigator.getUserMedia({ "audio": true, "video": true }, handleVideo, videoError);

  };

  areYouSignalingYourself(callerId){
    // Abort if the sender's signal is sent back to the sender.
    if (callerId === myId) {
      return true;
    }
  }

  isConnectionAlreadyMade(pcKey){
    var users = pcKey.split("---");
    if (pcs[users[0] + '---' + users[1]]) {
      if (pcs[users[0] + '---' + users[1]].status === 'connected') {
        return true;
      }
    }
    if ( pcs[users[1] + '---' + users[0]]) {
      if (pcs[users[1] + '---' + users[0]].status === 'connected') {
        return true;
      }
    }
  }

  createMeshGrid(userIds) {
    var grid = {};
    for (var i = 0; i < userIds.length; i++){
      if (grid[userIds[i]] === undefined && i !== userIds.length - 1) {
        grid[userIds[i]] = [];
      }
      for (var j = i; j < userIds.length; j++){
        if (i !== j) {
          grid[userIds[i]].push(userIds[i] + '---' + userIds[j]);
        }
      }
    }
    return grid;
  }

  getUserIds(){
    // These are hard-coded for testing. In production, get the ids dynamically. 
    userIds = [2, 3, 4, 5, 6];
    return userIds;
  }



  function initConferenceCall(){
    // Grab userIds from all the users in the room.
    var userIds = getUserIds();
    var meshGrid = createMeshGrid(userIds);
    signalingChannel.emit('signal conference call', JSON.stringify({"meshGrid": meshGrid}));
  }

  function animateIcon(iconId, iconClass){
    $(iconId).addClass(iconClass);
  };

  function initSingleCall(pcKey, mode) {
    $('.call-alerts-outgoing').show();
    $('.call-views').show();
    start(true, pcKey, mode);
    animateIcon('#callIcon', 'icon-spin');
  }

  render(){
  	return (
      <div className="call-views">
        <CallAlerts />  
        <VideoCardList />
      </div>
  	);
  }
}

export default AppVideo;


