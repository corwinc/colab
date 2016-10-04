import { combineReducers } from 'redux';
import AuthReducer from './auth/reducers/authReducer.jsx';
// import Comment from './comment/reducers/commentReducer.jsx';

const rootReducer = combineReducers({
	user : AuthReducer,  
	// comment : Comment,
	// text : Text,	
});

export default rootReducer;

