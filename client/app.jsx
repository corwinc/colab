import React, { Component } from 'react';
import Navbar from './src/components/navbar.jsx'

export default class App extends Component {
  render() {
    return (
      <div>
      	{this.props.children}
      </div>
    );
  }
}
