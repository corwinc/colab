import React from 'react';
import { render } from 'react-dom'; 
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as videoActionList from '../actions/videoActions.jsx';

import VideoCardList from './videoCardList.jsx';
import CallAlertList from './callAlertList.jsx';
const signalingChannel = io('/video');

class AppVideo extends React.Component {

  constructor(props){
    super(props);
    this.configuration = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
    this.pcs = {};
    this.streams = {};
    this.signalingChannel = io('/video'); 
  }  

  componentDidMount(){
    this.setSignalingChannel.call(this);
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
      if (myId == users[0].toString() || myId == users[1].toString()){
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
      context.pcs[signal.pcKey].close();
      if (signal.isCaller !== undefined){
        if (signal.isCaller) {
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
      var myCallsToMake = meshGrid[myId];
      if (myCallsToMake !== undefined) {
        myCallsToMake.forEach(function(pcKey, i){
          setTimeout(function(){
            context.initSingleCall(pcKey, 'conference call');
          }, i * 50);
        });
      }
    });
  }

  start(isCaller, pcKey, mode) {
    var context = this;
    context.isCaller = isCaller;

    this.pcs[pcKey] = new RTCPeerConnection(context.configuration);

    this.pcs[pcKey].onicecandidate = function (evt) {
      signalingChannel.emit('send candidate', JSON.stringify({ "candidate": evt.candidate, "isCaller": isCaller, 
                                                                "callerId": myId, "pcKey": pcKey, "mode": mode }));
    };

    this.pcs[pcKey].onaddstream = function (evt) {
      context.streams[pcKey] = evt.stream;
    };

    this.pcs[pcKey].onsignalingstatechange = function(evt) {
      if (this && (this.signalingState === 'have-local-offer' || this.signalingState === 'have-remote-offer')) {
        if (mode === 'direct call') {
          if (isCaller) {
            context.props.dispatch(videoActionList.showOutgoingAlerts(pcKey, 'outgoing user'));
          } else {
            context.props.dispatch(videoActionList.showIncomingAlerts(pcKey, 'incoming user'));
          }
        }
      }
      if (this && this.signalingState === 'closed') {
        delete this;
      }
    };

    this.pcs[pcKey].oniceconnectionstatechange = function(evt) {
      if (this && this.iceConnectionState === 'connected') {
        let hangupOnclick = ()=> {
          signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey}));
        };
        context.props.dispatch(videoActionList.addPeerConnection(pcKey, this, hangupOnclick));
        context.pcs[pcKey].status = 'connected';
        if (mode === 'direct call') {
          if (isCaller){
            context.props.dispatch(videoActionList.deleteOutgoingAlert(pcKey));
          } else {
            context.props.dispatch(videoActionList.deleteIncomingAlert(pcKey));
          }
        }
      }
    };

    const handleVideo = (stream) => {
      this.pcs[pcKey].addStream(stream);
      if (isCaller) {
        this.pcs[pcKey].createOffer(setDescription.bind(this), errorGettingDescription);
      } else {
        if (mode === 'direct call') {
          let acceptOnClick = ()=>{ context.pcs[pcKey].createAnswer(setDescription.bind(context), errorGettingDescription) };
          let rejectOnClick = ()=>{ signalingChannel.emit('disconnect call', JSON.stringify({"pcKey": pcKey, "isCaller": isCaller})) };
          context.props.dispatch(videoActionList.showIncomingAlerts(pcKey, 'incoming user', acceptOnClick, rejectOnClick));
        } 
        if (mode === 'conference call') {
          this.pcs[pcKey].createAnswer(setDescription.bind(this), errorGettingDescription);
        }
      }

      function setDescription(desc) {
        this.pcs[pcKey].setLocalDescription(desc);
        signalingChannel.emit('send offer', JSON.stringify({ "sdp": desc, "callerId": myId, "pcKey": pcKey, "mode": mode}));
      };

      function errorGettingDescription(err) {
        console.log("There was an error getting the description. Error message: ", err);
      };
    };


    navigator.getUserMedia({ "audio": true, "video": true }, handleVideo.bind(context), videoError);

    function videoError(error) {
      console.log("ERROR! ", error)
    };
  };

  areYouSignalingYourself(callerId){
    if (callerId === myId) {
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

  initSingleCall(pcKey, mode) {
    pcKey = pcKey || "2---18";
    mode = mode || "direct call";
    this.start(true, pcKey, mode);
  }

  initConferenceCall(){
    var userIds = this.getUserIds();
    var meshGrid = this.createMeshGrid(userIds);
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

  getUserIds(){
    var userIds = [2, 3, 4, 5];
    return userIds;
  }

  showProps(){
    console.log("PROPS ARE: ", this.props);
  }

  render(){
    return (
      <div className="call-views">
        <button onClick={ this.initConferenceCall.bind(this) }> Start trial conference call </button>
        <button onClick={ (()=>{ this.initSingleCall() }).bind(this) }> Start trial direct call </button>
        <CallAlertList isCaller={ this.isCaller } outgoingAlerts={ this.props.outgoingAlerts } incomingAlerts={ this.props.incomingAlerts }/>
        <VideoCardList connections={ this.props.connections } streams={ this.streams }/>
        <button onClick={ this.showProps.bind(this) }> Show props </button>
      </div>
    );
  }
}

AppVideo.propTypes = {
  connections: React.PropTypes.array.isRequired, 
  outgoingAlerts: React.PropTypes.array.isRequired, 
  incomingAlerts: React.PropTypes.array.isRequired
}

export default connect((store) => {
  return {
    connections: store.videoList.connections || [],
    outgoingAlerts: store.alertList.outgoingAlerts || [],
    incomingAlerts: store.alertList.incomingAlerts || []
  }
})(AppVideo);


