import React, { Component } from 'react';

import BookList from './src/containers/book-list.jsx';
import BookDetail from './src/containers/book-detail.jsx';

export default class App extends Component {
  render() {
    return (
      <div>
      	<BookList />
      	<BookDetail />
      </div>
    );
  }
}
