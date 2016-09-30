import React, { Component } from 'react';

// import BookList from './src/containers/book-list.jsx';
// import BookDetail from './src/containers/book-detail.jsx';
import Navbar from './src/components/navbar.jsx'

export default class App extends Component {
  render() {
    return (
      <div>
      	<Navbar />
      	{this.props.children}
      </div>
    );
  }
}
