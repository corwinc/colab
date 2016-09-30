import { combineReducers } from 'redux';
import BooksReducer from './reducer_books.jsx';
import ActiveBook from './reducers_active_book.jsx';

const rootReducer = combineReducers({
 //books: [{books},{books}]
 //single peace of state  //value is whatever gets return from the book reducer function
 //we are telling redux how to create our applications state
  
  books: BooksReducer,
  activeBook: ActiveBook,
});

export default rootReducer;
