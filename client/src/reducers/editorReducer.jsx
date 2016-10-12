const initialState = {
  quill: [],
  saveInterval: null,
  sharelinkId: '',
  docId: null,
  user: null,
  selectionLoc: null
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'SET_QUILL': {
			return Object.assign({}, state, {
				quill: [action.quill] 
			});
		}
		case 'SET_INTERVAL': {
			return Object.assign({}, state, {
				saveInterval: action.saveInterval
			});
		}
		case 'SET_LINK': {
			return Object.assign({}, state, {
				sharelinkId: action.sharelinkId
			});
		}
		case 'SET_USER': {
			return Object.assign({}, state, {
				user: action.user
			});
		}
		case 'SET_SELECTION_LOC':
		 return Object.assign({}, state, {
		    selectionLoc: action.loc
		 })
		case 'SET_DOC_ID':
			return Object.assign({}, state, {
				docId: action.docId
			})
		default:
		  return state;
	}
}
