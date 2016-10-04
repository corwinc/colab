var signalingChannel = io('/video');
var pc;
var configuration = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
//var localVideo = document.querySelector("#localVideo");
var remoteVideo = document.querySelector("#remoteVideo");
var globalIsCaller;

// Invoke start(true) to initiate a call
function start(isCaller) {

  globalIsCaller = isCaller;
  pc = new RTCPeerConnection(configuration);

  // addIceCandidate fires this.
  pc.onicecandidate = function (evt) {
    signalingChannel.emit('send candidate', JSON.stringify({ "candidate": evt.candidate, "isCaller": isCaller }));
  };

  // setRemoteDescription fires this. 
  pc.onaddstream = function (evt) {
    showRemoteVideo(evt, isCaller);
  };

  // This is one of the inputs into navigator.getUserMedia. It takes the stream from the user's webcam, sets it to the
  // local video view, 
  var handleVideo = function (stream) {
    //localVideo.src = window.URL.createObjectURL(stream);
    pc.addStream(stream);

    // If this is running inside the caller's client, creating an offer sends the description to the remote pper. 
    // If this is in the remote peer's client, the response sends back a description, but with an "answer" state. 
    if (isCaller) {
      pc.createOffer(gotDescription, errorGettingDescription);
    } else {
      showIncomingCallAlerts(pc, signalingChannel, gotDescription, errorGettingDescription);
    }

    function gotDescription(desc) {
      pc.setLocalDescription(desc);
      signalingChannel.emit('send offer', JSON.stringify({ "sdp": desc }));
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

  // Abort if the sender's signal is sent back to the sender.
  if (signal.sdp !== undefined) {
    if ((globalIsCaller && signal.sdp.type === 'offer') || (!globalIsCaller && signal.sdp.type === 'answer' )) {
      console.log('Detecting call from your own outgoing call signal.');
      return;
    }
  }

  // Abort if the sender's candidate signal is sent back to the sender.
  if (signal.candidate !== undefined) { 
    if ((globalIsCaller && signal.isCaller || !globalIsCaller && !signal.isCaller)) {
      console.log('Detecting your own candidate offer signal.');          
      return;
    }
  }

  // If the peer connection hasn't been made yet, invoke the start method to set up the 
  // video connection and ICE candidate signaling. Note that this will only occur in the 
  // client who did not make the call, so use start(false) to set isCaller to false
  if (!pc) {
    start(false);
  }

  // If the sdp description is present, set the remote description. This puts the remote peer's
  // media stream into the local peer's client.
  // If the candidate is present, the ICE connection protocol is still underway; add the candidate
  // to the connection to connect the clients. 
  if (signal.sdp) {
    pc.setRemoteDescription(new RTCSessionDescription(signal.sdp));
  } else if (signal.candidate) {
    pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
  }

});

// On the disconnect call event (which can come from either caller or callee) terminates the p2p connection. 
signalingChannel.on('disconnect call', function(){
  pc.close();
  pc = undefined;
  globalIsCaller = undefined;
  remoteVideo.src = undefined;
  $('.vid-box').hide();
  $('.call-views').hide();
  $('.call-incoming-options').hide();
});

$('#stopButton').on('click', function(){
  signalingChannel.emit('disconnect call');
})

/* THIS LOGIC IS NOW IN THE VIDEO COMPONENT */
// // User circles initiate the call on click
// $('.userCircle').on('click', function(){
//   $('.call-alerts-outgoing').show();
//   $('.call-views').show();
//   start(true);
//   animateIcon();
// })

function showIncomingCallAlerts(pc, signalingChannel, successCallback, errorCallback){
  $('.call-views').show();
  $('.call-alerts-incoming').show();
  $('.call-incoming-notifications').show();

  animateIcon('#seeOptionsIcon', 'icon-flash');

  $('#seeOptionsIcon').on('mouseover', function(){
    $('.call-incoming-notifications').css('display', 'inline-block');

    //$('#seeOptionsIcon').removeClass('icon-flash');
    //animateIcon('#seeOptionsIcon', 'icon-slide');
    //$('.call-incoming-notifications').hide();
    $('.call-incoming-options').css('display', 'inline-block');
  })

  $('#acceptIcon').on('click', function(){
    $('.call-alerts-incoming').hide();
    pc.createAnswer(successCallback, errorCallback);
    $('.vid-box').show();
  });

  $('#rejectIcon').on('click', function(){
    $('.call-alerts-incoming').hide();
    $('.call-incoming-options').hide();
    signalingChannel.emit('disconnect call');
  });
}

function showRemoteVideo(evt, isCaller){
  remoteVideo.src = window.URL.createObjectURL(evt.stream);
  $('.call-alerts-outgoing').hide();
  $('.call-views').show();
  if (isCaller) {
    $('.vid-box').show();
  }
}

function animateIcon(iconId, iconClass){
  $(iconId).addClass(iconClass);
};





