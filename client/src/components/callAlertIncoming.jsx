import React from 'react';
import { render } from 'react-dom'; 
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as videoActionList from '../actions/videoActions.jsx';

import IncomingCallOptions from './callAlertIncomingOptions.jsx'

class IncomingCallAlert extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="call-alerts-incoming">
        <div className="call-incoming-notifications">
          <img  id="seeOptionsIcon" 
                className="call-icon icon-flash" 
                src="public/images/callwaiting.svg"
                onMouseOver={ ()=>{ this.props.dispatch(videoActionList.showIncomingCallOptions(true)) }}>
          </img>
          <span className="call-message"> {"Incoming call from " + this.username + "..."}</span>
        </div>
        <IncomingCallOptions shouldShow={ this.props.shouldShow } acceptOnclick={ this.props.acceptOnclick } rejectOnclick={ this.props.rejectOnclick }/>
      </div>
    )
  }
};

IncomingCallAlert.propTypes = {
  shouldShow: React.PropTypes.bool.isRequired, 
}

export default connect((store) => {
  return {
    shouldShow: store.alertList.shouldShow || false
  }
})(IncomingCallAlert);


