import axios from 'axios';

//functions: initQuill, setInterval, setLink, setUser
export function initQuill(quill) {
	return {
		type: 'SET_QUILL',
		quill // may change later
	}
};

export function setInterval(interval) {
	return {
    type: 'SET_INTERVAL',
    interval
	}
};

export function setLink(link) {
	return {
    type: 'SET_LINK',
    link
	}
};

export function setUser(user) {
	return {
    type: 'SET_USER',
    user
	}
};

// perform async 

