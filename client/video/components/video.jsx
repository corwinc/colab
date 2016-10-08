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
    this.streams = {};
    this.signalingChannel = io('/video'); 
  }  

  componentDidMount(){
    this.setSignalingChannel();
  }

  setSignalingChannel(){
    this.signalingChannel.on('message', function(evt) {
      var signal = JSON.parse(evt);
      if (this.isConnectionAlreadyMade(signal.pcKey)) {
        console.log("You are already connected to this user.");
        return;
      }

      var users = signal.pcKey.split('---');

      if (myId == users[0].toString() || myId == users[1].toString()){
        if (areYouSignalingYourself(signal.callerId)){
          return;
        }
        if (!this.pcs[signal.pcKey]) {
          start(false, signal.pcKey, signal.mode);
        } 
        if (signal.sdp) {
          this.pcs[signal.pcKey].setRemoteDescription(new RTCSessionDescription(signal.sdp));
        } else if (signal.candidate) {
          this.pcs[signal.pcKey].addIceCandidate(new RTCIceCandidate(signal.candidate));
        }
      } 
    });

    this.signalingChannel.on('disconnect call', function(evt){
      var signal = JSON.parse(evt);
      this.pcs[signal.pcKey].close();
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
    $('.call-views').show();

    this.pcs[pcKey] = new RTCPeerConnection(configuration);

    this.pcs[pcKey].onicecandidate = function (evt) {
      signalingChannel.emit('send candidate', JSON.stringify({ "candidate": evt.candidate, 
                                                                "isCaller": isCaller, 
                                                                "callerId": myId, 
                                                                "pcKey": pcKey, 
                                                                "mode": mode }));
    };

    this.pcs[pcKey].onaddstream = function (evt) {
      this.streams[pcKey] = evt.stream;
    };

    this.pcs[pcKey].oniceconnectionstatechange = function(evt) {
   
      if (this.pcs[pcKey] && this.pcs[pcKey].iceConnectionState === 'connected') {

        this.pcs[pcKey].status = 'connected';

        if (mode === 'direct call') {
          toggleAlertViewState(isCaller, pcKey);
        }

        changeVideoCardListViewState(pcKey, mode);

        function changeVideoCardListViewState(pcKey, mode) {
          var newVidBox = $('#vidBoxTemplate').clone().attr('id', 'vidBox___' + pcKey);
          $('.vid-scrollable-list').append(newVidBox);
          $('#vidBox___' + pcKey + ' .video-element').attr('id', 'remoteVideo___' + pcKey);
          $('#vidBox___' + pcKey + ' .stop-button').attr('id', 'stopButton___' + pcKey).unbind().on('click', function(){
            signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey}));
          });
          document.querySelector("#remoteVideo___" + pcKey).src = window.URL.createObjectURL(streams[pcKey]);
          $("#vidBox___" + pcKey).show();
        };
        $('.vid-scrollable-list').show();
      }

    };

    this.pcs[pcKey].onsignalingstatechange = function(evt) {
      if (this.pcs[pcKey] && (this.pcs[pcKey].signalingState === 'have-local-offer' || this.pcs[pcKey].signalingState === 'have-remote-offer')) {
        if (mode === 'direct call') {
          toggleAlertViewState(isCaller, pcKey);
        }
      }
      if (this.pcs[pcKey] && this.pcs[pcKey].signalingState === 'closed') {
        delete this.pcs[pcKey];
      }
    };

    navigator.getUserMedia({ "audio": true, "video": true }, this.handleVideo, this.videoError);

    handleVideo(stream) {
      this.pcs[pcKey].addStream(stream);
      if (isCaller) {
        this.pcs[pcKey].createOffer(setDescription, errorGettingDescription);
      } else {
        if (mode === 'direct call') {
          showIncomingCallAlerts(pc, pcKey, signalingChannel, setDescription, errorGettingDescription);
        } 
        if (mode === 'conference call') {
          this.pcs[pcKey].createAnswer(setDescription, errorGettingDescription);
        }
      }

      function showIncomingCallAlerts(pc, pcKey, signalingChannel, successCallback, errorCallback){
        console.log("showIncomingCallAlerts happens at: ", new Date());

        $('#acceptIcon').unbind().on('click', function(){
          this.pcs[pcKey].createAnswer(successCallback, errorCallback);
        });

        $('#rejectIcon').unbind().on('click', function(){
          signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey}));
        });
      }

      function setDescription(desc) {
        this.pcs[pcKey].setLocalDescription(desc);
        signalingChannel.emit('send offer', JSON.stringify({ "sdp": desc, "callerId": myId, "pcKey": pcKey, "mode": mode}));
      };

      function errorGettingDescription(err) {
        console.log("There was an error getting the description. Error message: ", err);
      };
    };

    videoError(error) {
      console.log("ERROR! ", error)
    };
  };

  function initConferenceCall(){
    var userIds = getUserIds();
    var meshGrid = createMeshGrid(userIds);
    signalingChannel.emit('signal conference call', JSON.stringify({"meshGrid": meshGrid}));
  }

  function areYouSignalingYourself(callerId){
    if (callerId === myId) {
      return true;
    }
  }

  function isConnectionAlreadyMade(pcKey){
    var users = pcKey.split("---");
    if (this.pcs[users[0] + '---' + users[1]]) {
      if (this.pcs[users[0] + '---' + users[1]].status === 'connected') {
        return true;
      }
    }
    if ( this.pcs[users[1] + '---' + users[0]]) {
      if (this.pcs[users[1] + '---' + users[0]].status === 'connected') {
        return true;
      }
    }
  };

  function initSingleCall(pcKey, mode) {
    start(true, pcKey, mode);
  }

  function createMeshGrid(userIds) {
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

  function getUserIds(){
    userIds = [2, 3, 4, 5, 6];
    return userIds;
  }

  function toggleAlertViewState(isCaller, pcKey) {
    $('.call-alerts').toggle();
    isCaller ? toggleOutgoingState() : toggleIncomingState();

    function toggleOutgoingState(){
      console.log("toggling OUTGOING state");
      $('.call-alerts-outgoing').toggle();
      animateIcon('#callIcon', 'icon-spin');
    }

    function toggleIncomingState(){
      console.log("toggling incoming state")

      $('.call-alerts-incoming').toggle();
      $('.call-incoming-notifications').toggle();
      animateIcon('#seeOptionsIcon', 'icon-flash');
      $('#seeOptionsIcon').unbind().on('mouseover', function(){
        $('.call-incoming-notifications').css('display', 'inline-block');
        $('.call-incoming-options').css('display', 'inline-block');
      })
    }

    function animateIcon(iconId, iconClass){
      $(iconId).addClass(iconClass);
    };

  }

  render(){
  	return (
      <div className="call-views">
        <CallAlerts />  
        <VideoCardList connections={this.pcs} streams={this.streams}/>
      </div>
  	);
  }
}

export default AppVideo;


