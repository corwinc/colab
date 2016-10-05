import { combineReducers } from 'redux';
// import AuthReducer from './auth/reducers/authReducer.jsx';
import flashMessage from './auth/reducers/flashMessage.jsx';
// import Comment from './comment/reducers/commentReducer.jsx';

const rootReducer = combineReducers({
	flashMessage: flashMessage,
	//user : AuthReducer,  
	// comment : Comment,
	// text : Text,	
});

export default rootReducer;

