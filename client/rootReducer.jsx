import { combineReducers } from 'redux';
import AuthReducer from './auth/reducers/authReducer.jsx';
import flashMessages from './auth/reducers/flashMessage.jsx';
// import Comment from './comment/reducers/commentReducer.jsx';

const rootReducer = combineReducers({
	flashMessages: flashMessages,
	user : AuthReducer,  
	// comment : Comment,
	// text : Text,	
});

export default rootReducer;

