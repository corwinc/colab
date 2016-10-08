import React from 'react';
import { browserHistory } from 'react-router';

const OAuthSuccess = (props) => {
  if (props.location.query.token) {
    let {firstname, lastname, username, email, password } = props.location.query;
    //id = Number(id);
    const user = { firstname, lastname, username, email};
    localStorage.setItem('userToken', props.location.query.token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  browserHistory.replace('/documentlist');

  return (<div />);
};

export default OAuthSuccess;