import React from 'react';
import { browserHistory } from 'react-router';

const OAuthSuccess = (props) => {
  
  if (props.location.query.token) {
    const user = props.location.query.username;
    localStorage.setItem('userToken', props.location.query.token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  browserHistory.replace('/documentlist');
  
  return (<div />);
};

export default OAuthSuccess;
