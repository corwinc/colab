var signalingChannel = io('/video');
var pc;
var pcs = {};
//var pcKey = 0;
var configuration = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
//var localVideo = document.querySelector("#localVideo");
var remoteVideo = document.querySelector("#remoteVideo1");
var globalIsCaller = false;

// Invoke start(true) to initiate a call
function start(isCaller, pcKey) {

  remoteVideo.src = remoteVideo.src === "" ? document.querySelector("#remoteVideo1") : document.querySelector("#remoteVideo2");

  globalIsCaller = isCaller; 
  pcs[pcKey] = new RTCPeerConnection(configuration);

  // addIceCandidate fires this.
  pcs[pcKey].onicecandidate = function (evt) {
    signalingChannel.emit('send candidate', JSON.stringify({ "candidate": evt.candidate, "isCaller": isCaller, "pcKey": pcKey }));
  };

  // setRemoteDescription fires this. 
  pcs[pcKey].onaddstream = function (evt) {
    showRemoteVideo(evt, isCaller, remoteVideo, pcKey);
  };

  // setRemoteDescription fires this. 
  pcs[pcKey].oniceconnectionstatechange = function (evt) {
    if (pcs[pcKey] && pcs[pcKey].iceConnectionState === 'connected' || pcs[pcKey] && pcs[pcKey].iceConnectionState === 'complete') { 
      console.log("CONNECTION STATE CHANGE: ", pcs[pcKey].iceConnectionState);
      // Reset this to false after the call is completed, so it doesn't interfere with the logic of the next call. 
      globalIsCaller = false;
    }
  };

  pcs[pcKey].onsignalingstatechange = function (evt) {
    if (pcs[pcKey] && pcs[pcKey].signalingState === 'stable') { 
      console.log("signalingState CHANGE: ", pcs[pcKey].signalingState);
      //pcKey++;
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
      showIncomingCallAlerts(pc, pcKey, signalingChannel, gotDescription, errorGettingDescription);
    }

    function gotDescription(desc) {
      pcs[pcKey].setLocalDescription(desc);
      signalingChannel.emit('send offer', JSON.stringify({ "sdp": desc, "pcKey": pcKey}));
    };

    function errorGettingDescription(err) {
      console.log("There was an error getting the description. Error message: ", err);
    };
  };

  var videoError = function (error) {
    console.log("ERROR! ", error)
  };

  // get the local stream, show it in the local video element and send it
  navigator.getUserMedia({ "audio": true, "video": true }, handleVideo, videoError);

};

// Both candidate and video stream data are emitted through 'message' events from the server's socket 
// connection.
signalingChannel.on('message', function(evt) {

  var signal = JSON.parse(evt);
  var users = signal.pcKey.split('---');

  if (isConnectionAlreadyMade(signal.pcKey)) {
    console.log("You are already connected to this user.");
    return;
  }

  if (myId == users[0].toString() || myId == users[1].toString()){

    if (areYouSignalingYourself(signal)){
      return;
    }

    // If the peer connection hasn't been made yet, invoke the start method to set up the 
    // video connection and ICE candidate signaling. Note that this will only occur in the 
    // client who did not make the call, so use start(false) to set isCaller to false
    if (!pcs[signal.pcKey]) {
      start(false, signal.pcKey);
    } 

    $('.vid-box').data('pcKey', signal.pcKey);
    //pcs[signal.pcKey].status = 'connected';

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
  pcs[signal.pcKey] = undefined;
  globalIsCaller = undefined;
  remoteVideo.src = undefined;

  $('.vid-box').hide();
  $('.call-views').hide();
  $('.call-incoming-options').hide();
});

$('#stopButton').on('click', function(){
  var pcKey = $(".vid-box").data('pcKey');
  signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey}));
})

/* THIS LOGIC IS NOW IN THE VIDEO COMPONENT */
// // User circles initiate the call on click
// $('.userCircle').on('click', function(){
//   $('.call-alerts-outgoing').show();
//   $('.call-views').show();
//   start(true);
//   animateIcon();
// })

function showIncomingCallAlerts(pc, pcKey, signalingChannel, successCallback, errorCallback){
  $('.call-views').show();
  $('.call-alerts-incoming').show();
  $('.call-incoming-notifications').show();

  animateIcon('#seeOptionsIcon', 'icon-flash');

  $('#seeOptionsIcon').on('mouseover', function(){
    $('.call-incoming-notifications').css('display', 'inline-block');
    $('.call-incoming-options').css('display', 'inline-block');
  })

  $('#acceptIcon').on('click', function(){
    pcs[pcKey].status = 'connected';
    $('.call-alerts-incoming').hide();
    pcs[pcKey].createAnswer(successCallback, errorCallback);
    $('.vid-box').show();
  });

  $('#rejectIcon').on('click', function(){
    $('.call-alerts-incoming').hide();
    $('.call-incoming-options').hide();
    signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey}));
  });
}

function showRemoteVideo(evt, isCaller, video, pcKey){
  pcs[pcKey].status = 'connected';
  video.src = window.URL.createObjectURL(evt.stream);
  $('.call-alerts-outgoing').hide();
  $('.call-views').show();
  if (isCaller) {
    $('.vid-box').show();
  }
};

function animateIcon(iconId, iconClass){
  $(iconId).addClass(iconClass);
};

function areYouSignalingYourself(signal){
  // Abort if the sender's signal is sent back to the sender.
  if (signal.sdp !== undefined) {
    if ((globalIsCaller && signal.sdp.type === 'offer') || (!globalIsCaller && signal.sdp.type === 'answer' )) {
      console.log('Detecting call from your own outgoing call signal.');
      return true;
    }
  }
  // Abort if the sender's candidate signal is sent back to the sender.
  if (signal.candidate !== undefined) { 
    if ((globalIsCaller && signal.isCaller || !globalIsCaller && !signal.isCaller)) {
      console.log('Detecting your own candidate offer signal.');          
      return true;
    }
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



