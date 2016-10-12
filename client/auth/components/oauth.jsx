import React from 'react';
import { browserHistory } from 'react-router';

const OAuthSuccess = (props) => {

	console.log('props-------------->', props);
  if (props.location.query.token) {
    // //id = Number(id);
    const user = props.location.query.username;
    localStorage.setItem('userToken', props.location.query.token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  browserHistory.replace('/documentlist');

  return (<div />);
};

export default OAuthSuccess;


// localStorage.userToken = this.props.location.query.username;
    // const username = this.props.location.query.username;
    // localStorage.user = JSON.stringify(username);
    // console.log('userToken-->', localStorage.userToken);
    // console.log('user-->', localStorage.user);