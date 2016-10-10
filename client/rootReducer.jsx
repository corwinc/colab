import { combineReducers } from 'redux';
import AuthReducer from './auth/reducers/authReducer.jsx';
import flashMessages from './auth/reducers/flashMessage.jsx';
import EditorReducer from './src/reducers/editorReducer.jsx';
import documentlistReducer from './src/reducers/documentlistReducer.jsx';
import videoReducer from './src/reducers/videoReducer.jsx';
import callAlertReducer from './src/reducers/callAlertReducer.jsx';


// import Comment from './comment/reducers/commentReducer.jsx';

const rootReducer = combineReducers({
	flashMessages: flashMessages,
	user : AuthReducer,  
	editor: EditorReducer,
	documentlist: documentlistReducer, 
  videoList: videoReducer, 
  alertList: callAlertReducer

	// comment : Comment,
	// text : Text,	
});

export default rootReducer;

