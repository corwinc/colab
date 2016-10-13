import React from 'react';
import { render } from 'react-dom'; 
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as videoActionList from '../actions/videoActions.jsx';

import VideoCardList from './videoCardList.jsx';
import CallAlertList from './callAlertList.jsx';
const signalingChannel = io('/video');
const documentChannel = io('/document');

class AppVideo extends React.Component {

  constructor(props){
    super(props);
    this.configuration = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
    this.pcs = {};
    this.streams = {};
    this.signalingChannel = io('/video');
    this.isCaller;
    this.activeUsers;
  }  

  // Set the web sockets and dispatch the call-starting functions to the store on component mount. 
  componentDidMount(){
    this.setSignalingChannel.call(this);
    this.setDocumentChannel.call(this);
    this.props.dispatch(videoActionList.setStartCall(this.start.bind(this)));
    this.props.dispatch(videoActionList.setStartConferenceCall(this.initConferenceCall.bind(this)));
  }

  setDocumentChannel(){
    var context = this;

    // When a user joins a document, it will be stored in the server (in temporary storage) as active
    documentChannel.on('user joins document', function(evt) {
      var signal = JSON.parse(evt);
      if (context.props.documentId === signal.documentId){
        if (signal.newUserId != context.props.userId){
          context.activeUsers = signal.activeUsers;
        }
      }
    });

    // When a user leaves the document, it will be removed from the temporary active user storage. 
    documentChannel.on('user leaves document', function(evt) {
      var signal = JSON.parse(evt);
      if (context.props.documentId === signal.documentId){
        context.activeUsers = signal.activeUsers;
      }
    });
  }

  setSignalingChannel(){
    var context = this;

    // Messages constitute the ICE protocol communications. Refer to this MDN doc for further 
    // information on how WebRTC handles peer-to-peer communications:
    // https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC/Peer-to-peer_communications_with_WebRTC
    signalingChannel.on('message', function(evt) {
      var signal = JSON.parse(evt);
      // Check to see if the p2p connection already exists.
      if (context.isConnectionAlreadyMade(signal.pcKey)) {
        console.log("You are already connected to this user.");
        return;
      }
      // The caller id is in the left, callee id on the right, when splitting the pcKey around its '---'.
      var users = signal.pcKey.split('---');
      // This checks to make sure the active user for this client is one of the members of the call. 
      if (context.props.userId == users[0] || context.props.userId == users[1]){
        // Check to make sure the user isn't trying to call itself. 
        if (context.areYouSignalingYourself(signal.callerId)){
          return;
        }
        // If the peer connection doesn't yet exist, this means the active user is receiving a signal from 
        // a remote user who wants to connect to it. The start method sets up the peer connection, with this user
        // in the role of the callee (the remote user is, in this case, the caller).
        if (!context.pcs[signal.pcKey]) {
          context.start(false, signal.pcKey, signal.mode);
        } 
        // signal.sdp carries the call offer from peer 1 to peer 2. This will first be received by the 
        // callee. Callee then creates a call answer, sending an sdp offer back to the original caller. 
        if (signal.sdp) {
          context.pcs[signal.pcKey].setRemoteDescription(new RTCSessionDescription(signal.sdp));
        } 
        // signal.candidate carries ICE candidate data from 1 to peer 2. After the original caller receives
        // the sdp answer from the callee, candidate data is sent to the callee. The callee processes this data
        // and sends back its own ICE candidate data. 
        else if (signal.candidate) {
          context.pcs[signal.pcKey].addIceCandidate(new RTCIceCandidate(signal.candidate));
        }
      } 
    });

    // When a p2p connection ends (a call hangup or rejection), dispatch Redux actions that will remove the call 
    // alerts or the video div, then delete the pcKey from the component's properties. This allows the two users
    // to reconnect with a new call immediately after closing the current one. 
    signalingChannel.on('disconnect call', function(evt){
      var signal = JSON.parse(evt);
      context.pcs[signal.pcKey] ? context.pcs[signal.pcKey].close() : null;
      // If the call was rejected, dispatch actions to hide call alerts.
      if (signal.isHangup) {
        if (this.isCaller) {
          context.props.dispatch(videoActionList.deleteOutgoingAlert(signal.pcKey));
        } else {
          context.props.dispatch(videoActionList.deleteIncomingAlert(signal.pcKey));
        }
      } 
      // If the disconnection was not from a rejection, it was from user(s) hanging up. Dispatch a Redux action to hide the 
      // video view. 
      else {
        context.props.dispatch(videoActionList.removePeerConnection(signal.pcKey));
      }      
      delete context.pcs[signal.pcKey];
    });

    // Conference calls differ from regular calls in that they (via the 'conference call' mode) do not rely on the users
    // accepting nor rejecting calls. The conference call (beta version) automatically connects to all users who are active in the
    // room -- they can then hangup on the call without it disconnecting other users. 
    signalingChannel.on('initialize conference call', function(evt) {
      var signal = JSON.parse(evt);
      // The meshgrid will ensure that one connection exists between each group member, without duplicating any connections/calls. 
      var meshGrid = signal.meshGrid;
      var myCallsToMake = meshGrid[context.props.userId];
      // Loop through all the calls this active user needs to make. Once this has run for all users in the document, there will be 
      // a p2p connection between all peers, identified by the pcKey (formatted as 'callerId---calleeId').
      if (myCallsToMake !== undefined) {
        myCallsToMake.forEach(function(pcKey, i){
          setTimeout(function(){
            // Providing a delay between connections allows the browser to process all ICE protocol steps without bottlenecking. 
            context.start(true, pcKey, 'conference call');
          }, i * 150);
        });
      }
    });

  }

  // start establishes the p2p connection between a caller and callee. It behaves differently for callees than callers, and 
  // also for direct call mode versus conference call mode: Callees 
  start(isCaller, pcKey, mode, calleeId) {

    // Make sure the connection doesn't already exist. 
    if (this.isConnectionAlreadyMade(pcKey)){
      console.log("You're already connected to this user. Womp womp.");
      return;
    }

    // Make sure the caller isn't signaling itself. 
    if (this.areYouSignalingYourself(calleeId)) { 
      console.log("You can't call yourself, silly goose!");
      return;
    } 

    this.isCaller = isCaller;
    signalingChannel.isCaller = isCaller;
    var context = this;

    // Create the new p2p connection. configuration leverages existing STUN and TURN servers to handle ICE protocol communications. 
    this.pcs[pcKey] = new RTCPeerConnection(context.configuration);

    // Send the current user (either caller or callee) back to the remote peer as an ICE candidate. 
    this.pcs[pcKey].onicecandidate = function (evt) {
      signalingChannel.emit('send candidate', JSON.stringify({ "candidate": evt.candidate, "isCaller": isCaller, 
                                                                "callerId": context.props.userId, "pcKey": pcKey, "mode": mode }));
    };

    // This stores the media stream from a remote user in a component property. Storing it makes the delay in showing the accept/reject
    // call icons possible. 
    this.pcs[pcKey].onaddstream = function (evt) {
      context.streams[pcKey] = evt.stream;
    };

    // If both peers have detected offers in a direct call, show the icons. Caller sees a 'Waiting for response' icon, whereas the 
    // callee sees an 'Incoming call...' icon, with accept/reject children icons. 
    this.pcs[pcKey].onsignalingstatechange = function(evt) {
      if (this && (this.signalingState === 'have-local-offer' || this.signalingState === 'have-remote-offer')) {
        if (mode === 'direct call') {
          if (isCaller) {
            context.props.dispatch(videoActionList.showOutgoingAlerts(pcKey, 'outgoing user'));
          } 
        }
      }
      if (this && this.signalingState === 'closed') {
        delete this;
      }
    };

    // The 'connected' iceConnectionState indicates the two peers are connected and ready for media sharing. This dispatches 
    // the appropriate alert-hiding action, depending on who the caller and callee are, then dispatches the action to show the 
    // new media. 
    this.pcs[pcKey].oniceconnectionstatechange = function(evt) {
      if (this && this.iceConnectionState === 'connected') {
        if (mode === 'direct call') {
          if (isCaller){
            // The caller dispatches the deleteOutgoingAlert action.
            context.props.dispatch(videoActionList.deleteOutgoingAlert(pcKey));
          } else {
            // The callee dispatches the deleteIncomingAlert action.
            context.props.dispatch(videoActionList.deleteIncomingAlert(pcKey));
          }
        }
        // This onclick callback signals the peers that this call is disconnecting. The work of disconnecting it is done in the
        // socket listener for the 'disconnect call' event.
        let hangupOnclick = ()=> {
          signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey}));
        };
        // Add the peer connection view. 
        context.props.dispatch(videoActionList.addPeerConnection(pcKey, this, hangupOnclick));
        // Record that this p2p connection is connected, for later detection of redundant connections. 
        context.pcs[pcKey].status = 'connected';
      }
    };

    // Callback which sets a peer's local description according to the data returned from getting its media, then sends that 
    // local description to the remote peer as an sdp offer. 
    const setDescription = (desc) => {
      this.pcs[pcKey].setLocalDescription(desc);
      signalingChannel.emit('send offer', JSON.stringify({ "sdp": desc, "callerId": context.props.userId, "pcKey": pcKey, "mode": mode}));
    };

    // Error handler.
    const errorGettingDescription = (err) => {
        console.log("There was an error getting the description. Error message: ", err);
      };   

    // Add the stream to the peer connection. The caller then creates an offer for the remote peer; the remote peer (callee) creates and sends
    // back an answer. In the case of a direct call, the remote peer answer occurs in an accept call callback, or the connection is terminated 
    // in the rejection callback. 
    const handleVideo = (stream) => {
      this.pcs[pcKey].addStream(stream);
      if (isCaller) {
        this.pcs[pcKey].createOffer(setDescription.bind(this), errorGettingDescription);
      } else {
        if (mode === 'direct call') {
          // Dispatch the accept/reject callbacks to the store, so that they may be assigned to their respective icons in their components.
          let acceptOnClick = ()=>{ context.pcs[pcKey].createAnswer(setDescription.bind(context), errorGettingDescription) };
          let rejectOnClick = ()=>{ signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey, "isHangup": true})) };
          context.props.dispatch(videoActionList.showIncomingAlerts(pcKey, 'incoming user', acceptOnClick, rejectOnClick));
        } 
        if (mode === 'conference call') {
          // In a conference call, the answer is created directly. 
          this.pcs[pcKey].createAnswer(setDescription.bind(this), errorGettingDescription);
        }
      }
    };

    const videoError = (error) => {
      console.log("ERROR! ", error)
    };

    // Grab the user's media, carry forward the next step in the ICE protocol. 
    navigator.getUserMedia({ "audio": true, "video": true }, handleVideo.bind(context), videoError);
  };

  // Helper to make sure the user is not signaling itself. 
  areYouSignalingYourself(callerId){
    if (callerId === this.props.userId) {
      return true;
    }
  }

  // Helper to make sure the p2p connection does not already exist by splitting the pcKey and looking at both 
  // combinations of connections that could be made for those users (A---B and B---A represent the same p2p connection.)
  isConnectionAlreadyMade(pcKey){
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

  // Initialize the conference call by forming a meshgrid of all needed p2p connections, then send this to all clients 
  // via websockets. 
  initConferenceCall(){
    var meshGrid = this.createMeshGrid(this.activeUsers);
    signalingChannel.emit('signal conference call', JSON.stringify({"meshGrid": meshGrid}));
  }

  // The mesh grid ensures all possible p2p relationships of all active users are created, so that, after the conference call
  // is initialized, all users will be connected. 
  // Visually, if there are 4 users, the mesh grid will connect them as follows: 
  //    A    B    C    D
  // A  x    o    o    o
  // B  x    x    o    o
  // C  x    x    x    o
  // D  x    x    x    x
  // The o's show where a pc will be made from the row and column letters, in that order, such that the output of this
  // grid is ["A---B", "A---C", "A---D", "B---C", "B---D", "C---D"]. The x's show where a pc would be redundant, do to the
  // pc's created at the o points, or the fact that a peer cannot connect to itself (i.e., "A---A" is invalid).
  // Note that each user's id will be used as a key in the grid object, with all the pcKey's in which it is the caller are 
  // pushed into the array found at that key. User C in the above example thus has ["C---D"] as the only entry at grid["C"].
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

  // Render the components. No call alerts nor videos will be showing on the first load. 
  render(){
    return (
      <div className="call-views">
        <CallAlertList isCaller={ this.isCaller } outgoingAlerts={ this.props.outgoingAlerts } incomingAlerts={ this.props.incomingAlerts }/>
        <VideoCardList connections={ this.props.connections } streams={ this.streams }/>
      </div>
    );
  }
}

AppVideo.propTypes = {
  connections: React.PropTypes.array.isRequired, 
  outgoingAlerts: React.PropTypes.array.isRequired, 
  incomingAlerts: React.PropTypes.array.isRequired, 
  userId: React.PropTypes.number.isRequired
}

// Use Redux's connect to bind the AppVideo's props to values in the Redux store. 
export default connect((store) => {
  return {
    connections: store.videoList.connections || [],
    outgoingAlerts: store.alertList.outgoingAlerts || [],
    incomingAlerts: store.alertList.incomingAlerts || [], 
    userId: parseInt(store.documentlist.curUser) || 0, 
    documentId: store.tvPage.curDoc
  }
})(AppVideo);


