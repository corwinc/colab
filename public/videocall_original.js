var signalingChannel = io('/video');
var pc;
var pcs = {};
var userIds = {};
var configuration = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
//var localVideo = document.querySelector("#localVideo");

// Invoke start(true) to initiate a call
function start(isCaller, pcKey, mode) {

  makeNewVideoCard(pcKey, mode);

  function makeNewVideoCard(pcKey, mode) {
    var newVidBox = $('#vidBoxTemplate').clone().attr('id', 'vidBox___' + pcKey);
    $('.vid-scrollable-list').append(newVidBox);
    $('#vidBox___' + pcKey + ' .video-element').attr('id', 'remoteVideo___' + pcKey);
    $('#vidBox___' + pcKey + ' .stop-button').attr('id', 'stopButton___' + pcKey).unbind().on('click', function(){
      signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey}));
    });
    console.log(mode);
    if (mode === 'conference call' && !isCaller){
      $("#vidBox___" + pcKey).show();
    }
  };

  var remoteVideo = document.querySelector("#remoteVideo___" + pcKey);
  pcs[pcKey] = new RTCPeerConnection(configuration);

  // addIceCandidate fires this.
  pcs[pcKey].onicecandidate = function (evt) {
    signalingChannel.emit('send candidate', JSON.stringify({ "candidate": evt.candidate, 
                                                              "isCaller": isCaller, 
                                                              "callerId": myId, 
                                                              "pcKey": pcKey, 
                                                              "mode": mode }));
  };

  // setRemoteDescription fires this. 
  pcs[pcKey].onaddstream = function (evt) {
    showRemoteVideo(evt, isCaller, pcKey, remoteVideo);
  };

  function showRemoteVideo(evt, isCaller, pcKey, video) {
    pcs[pcKey].status = 'connected';
    console.log("******** evt.stream is:  ", evt.stream);
    video.src = window.URL.createObjectURL(evt.stream);
    $('.call-alerts-outgoing').hide();
    $('.call-views').show();
    if (isCaller) {
      $('#vidBox___' + pcKey).show();
    }
  };

  // This is one of the inputs into navigator.getUserMedia. It takes the stream from the user's webcam, sets it to the
  // local video view, 
  var handleVideo = function (stream) {
    //localVideo.src = window.URL.createObjectURL(stream);
    pcs[pcKey].addStream(stream);

    // If this is running inside the caller's client, creating an offer sends the description to the remote pper. 
    // If this is in the remote peer's client, the response sends back a description, but with an "answer" state. 
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

// Both candidate and video stream data are emitted through 'message' events from the server's socket 
// connection.
signalingChannel.on('message', function(evt) {

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
    console.log("SIGNAL MODE: ", signal.mode);
    // If the peer connection hasn't been made yet, invoke the start method to set up the 
    // video connection and ICE candidate signaling. Note that this will only occur in the 
    // client who did not make the call, so use start(false) to set isCaller to false
    if (!pcs[signal.pcKey]) {
      start(false, signal.pcKey, signal.mode);
    } 

    // If the sdp description is present, set the remote description. This puts the remote peer's
    // media stream into the local peer's client.
    // If the candidate is present, the ICE connection protocol is still underway; add the candidate
    // to the connection to connect the clients. 
    if (signal.sdp) {
      pcs[signal.pcKey].setRemoteDescription(new RTCSessionDescription(signal.sdp));
    } else if (signal.candidate) {
      pcs[signal.pcKey].addIceCandidate(new RTCIceCandidate(signal.candidate));
    }
  } 
});

// On the disconnect call event (which can come from either caller or callee) terminates the p2p connection. 
signalingChannel.on('disconnect call', function(evt){
  var signal = JSON.parse(evt);
  pcs[signal.pcKey].close();
  delete pcs[signal.pcKey];
  var remoteVideo = document.querySelector("#remoteVideo___" + signal.pcKey);
  remoteVideo.src = undefined;

  $('#vidBox___' + signal.pcKey).remove();
  $('.call-incoming-options').hide();

  // If there is only the template .vid-box element left, the there are no calls active, so the call-views can be hidden.
  if ($('.vid-box').length === 1) {
    $('.call-views').hide();
  }
});

signalingChannel.on('initialize conference call', function(evt) {
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

function initConferenceCall(){
  // Grab userIds from all the users in the room.
  var userIds = getUserIds();
  var meshGrid = createMeshGrid(userIds);
  signalingChannel.emit('signal conference call', JSON.stringify({"meshGrid": meshGrid}));
}

function animateIcon(iconId, iconClass){
  $(iconId).addClass(iconClass);
};

function areYouSignalingYourself(callerId){
  // Abort if the sender's signal is sent back to the sender.
  if (callerId === myId) {
    return true;
  }
}

function isConnectionAlreadyMade(pcKey){
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
};

function initSingleCall(pcKey, mode) {
  $('.call-alerts-outgoing').show();
  $('.call-views').show();
  start(true, pcKey, mode);
  animateIcon('#callIcon', 'icon-spin');
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
  // These are hard-coded for testing. In production, get the ids dynamically. 
  userIds = [2, 3, 4, 5, 6];
  return userIds;
}

