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

  componentDidMount(){
    this.setSignalingChannel.call(this);
    this.setDocumentChannel.call(this);
    this.props.dispatch(videoActionList.setStartCall(this.start.bind(this)));
    this.props.dispatch(videoActionList.setStartConferenceCall(this.initConferenceCall.bind(this)));
  }

  // componentWillUnmount(){
  //   documentChannel.emit('user leaving document', JSON.stringify({"documentId": this.props.documentId, "exitingUserId": this.props.userId}));
  // }

  setDocumentChannel(){
    var context = this;

    documentChannel.on('user joins document', function(evt) {
      var signal = JSON.parse(evt);
      if (context.props.documentId === signal.documentId){
        if (signal.newUserId != context.props.userId){
          context.activeUsers = signal.activeUsers;
        }
      }
    });

    documentChannel.on('user leaves document', function(evt) {
      var signal = JSON.parse(evt);
      if (context.props.documentId === signal.documentId){
        context.activeUsers = signal.activeUsers;
      }
    });
  }

  setSignalingChannel(){
    var context = this;

    signalingChannel.on('message', function(evt) {
      var signal = JSON.parse(evt);
      if (context.isConnectionAlreadyMade(signal.pcKey)) {
        console.log("You are already connected to this user.");
        return;
      }
      var users = signal.pcKey.split('---');
      if (context.props.userId == users[0].toString() || context.props.userId == users[1].toString()){
        if (context.areYouSignalingYourself(signal.callerId)){
          return;
        }
        if (!context.pcs[signal.pcKey]) {
          context.start(false, signal.pcKey, signal.mode);
        } 
        if (signal.sdp) {
          context.pcs[signal.pcKey].setRemoteDescription(new RTCSessionDescription(signal.sdp));
        } else if (signal.candidate) {
          context.pcs[signal.pcKey].addIceCandidate(new RTCIceCandidate(signal.candidate));
        }
      } 
    });

    signalingChannel.on('disconnect call', function(evt){
      var signal = JSON.parse(evt);
      context.pcs[signal.pcKey] ? context.pcs[signal.pcKey].close() : null;
      if (signal.isHangup) {
        if (this.isCaller) {
          context.props.dispatch(videoActionList.deleteOutgoingAlert(signal.pcKey));
        } else {
          context.props.dispatch(videoActionList.deleteIncomingAlert(signal.pcKey));
        }
      } else {
        context.props.dispatch(videoActionList.removePeerConnection(signal.pcKey));
      }      
      delete context.pcs[signal.pcKey];
    });

    signalingChannel.on('initialize conference call', function(evt) {
      var signal = JSON.parse(evt);
      var meshGrid = signal.meshGrid;
      var myCallsToMake = meshGrid[context.props.userId];
      if (myCallsToMake !== undefined) {
        myCallsToMake.forEach(function(pcKey, i){
          setTimeout(function(){
            context.start(true, pcKey, 'conference call');
          }, i * 150);
        });
      }
    });

  }

  start(isCaller, pcKey, mode, calleeId) {

    if (this.isConnectionAlreadyMade(pcKey)){
      console.log("You're already connected to this user. Womp womp.");
      return;
    }
    if (this.areYouSignalingYourself(calleeId)) { 
      console.log("You can't call yourself, silly goose!");
      return;
    } 

    this.isCaller = isCaller;
    signalingChannel.isCaller = isCaller;
    var context = this;

    this.pcs[pcKey] = new RTCPeerConnection(context.configuration);

    this.pcs[pcKey].onicecandidate = function (evt) {
      signalingChannel.emit('send candidate', JSON.stringify({ "candidate": evt.candidate, "isCaller": isCaller, 
                                                                "callerId": context.props.userId, "pcKey": pcKey, "mode": mode }));
    };

    this.pcs[pcKey].onaddstream = function (evt) {
      context.streams[pcKey] = evt.stream;
    };

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

    this.pcs[pcKey].oniceconnectionstatechange = function(evt) {
      if (this && this.iceConnectionState === 'connected') {
        if (mode === 'direct call') {
          if (isCaller){
            context.props.dispatch(videoActionList.deleteOutgoingAlert(pcKey));
          } else {
            context.props.dispatch(videoActionList.deleteIncomingAlert(pcKey));
          }
        }
        let hangupOnclick = ()=> {
          signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey}));
        };
        context.props.dispatch(videoActionList.addPeerConnection(pcKey, this, hangupOnclick));
        context.pcs[pcKey].status = 'connected';
      }
    };

    const setDescription = (desc) => {
      this.pcs[pcKey].setLocalDescription(desc);
      signalingChannel.emit('send offer', JSON.stringify({ "sdp": desc, "callerId": context.props.userId, "pcKey": pcKey, "mode": mode}));
    };

    const errorGettingDescription = (err) => {
        console.log("There was an error getting the description. Error message: ", err);
      };   

    const handleVideo = (stream) => {
      this.pcs[pcKey].addStream(stream);
      if (isCaller) {
        this.pcs[pcKey].createOffer(setDescription.bind(this), errorGettingDescription);
      } else {
        if (mode === 'direct call') {
          let acceptOnClick = ()=>{ context.pcs[pcKey].createAnswer(setDescription.bind(context), errorGettingDescription) };
          let rejectOnClick = ()=>{ signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey, "isHangup": true})) };
          context.props.dispatch(videoActionList.showIncomingAlerts(pcKey, 'incoming user', acceptOnClick, rejectOnClick));
        } 
        if (mode === 'conference call') {
          this.pcs[pcKey].createAnswer(setDescription.bind(this), errorGettingDescription);
        }
      }
    };

    const videoError = (error) => {
      console.log("ERROR! ", error)
    };
    navigator.getUserMedia({ "audio": true, "video": true }, handleVideo.bind(context), videoError);
  };

  areYouSignalingYourself(callerId){
    if (callerId === this.props.userId) {
      return true;
    }
  }

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

  initConferenceCall(){
    var meshGrid = this.createMeshGrid(this.activeUsers);
    signalingChannel.emit('signal conference call', JSON.stringify({"meshGrid": meshGrid}));
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

  showProps() {
    console.log("USERS ARE: ", this.activeUsers);
  }

  render(){
    return (
      <div className="call-views">
        <button onClick={ this.initConferenceCall.bind(this) }> Start trial conference call </button>
        <CallAlertList isCaller={ this.isCaller } outgoingAlerts={ this.props.outgoingAlerts } incomingAlerts={ this.props.incomingAlerts }/>
        <VideoCardList connections={ this.props.connections } streams={ this.streams }/>
        <button onClick={ this.showProps.bind(this) }> Show users </button>
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

export default connect((store) => {
  return {
    connections: store.videoList.connections || [],
    outgoingAlerts: store.alertList.outgoingAlerts || [],
    incomingAlerts: store.alertList.incomingAlerts || [], 
    userId: parseInt(store.documentlist.curUser) || 0, 
    documentId: store.tvPage.curDoc
  }
})(AppVideo);


