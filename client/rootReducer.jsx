import { combineReducers } from 'redux';
import AuthReducer from './auth/reducers/authReducer.jsx';
import flashMessages from './auth/reducers/flashMessage.jsx';
import EditorReducer from './src/reducers/editorReducer.jsx';
import documentlistReducer from './src/reducers/documentlistReducer.jsx';
import videoReducer from './video/reducers/videoReducer.jsx';
import callAlertReducer from './video/reducers/callAlertReducer.jsx';
import Comment from './comments/reducers/commentReducers.jsx';
import tvPageReducer from './src/reducers/tvPageReducer.jsx';
import navbarReducer from './src/reducers/navbarReducer.jsx';

const rootReducer = combineReducers({
	flashMessages: flashMessages,
	user : AuthReducer,  
	editor: EditorReducer,
	documentlist: documentlistReducer, 
  videoList: videoReducer, 
  alertList: callAlertReducer,
	comment : Comment,
  tvPage: tvPageReducer,
  navbar: navbarReducer
});

export default rootReducer;

