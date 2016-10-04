import { combineReducers } from 'redux';
import AuthReducer from './auth/reducers/authReducer.jsx';

const rootReducer = combineReducers({
	user : AuthReducer,  	
});

export default rootReducer;

