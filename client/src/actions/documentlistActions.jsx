export function showMessage(message) {
	return {
		type: 'SHOW_MESSAGE',
		// message
		message: message
	}
}

export function clearMessage() {
	return {
		type: 'CLEAR_MESSAGE',
		message: ''
	}
}

export function populateDocs(data) {
	return {
		type: 'POPULATE_DOCS',
		documents: data
	}
}

export function setInputvalue(val) {
	return {
		type: 'SET_INPUTVALUE',
		inputValue: val
	}
}
