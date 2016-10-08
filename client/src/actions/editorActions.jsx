export function initQuill(quill) {
	return {
		type: 'SET_QUILL',
		quill: quill
	}
}

export function setInterval(interval) {
	return {
    type: 'SET_INTERVAL',
    interval: interval
	}
}

export function setLink(sharelinkId) {
	return {
    type: 'SET_LINK',
    sharelinkId: sharelinkId
	}
}

export function setUser(user) {
	return {
    type: 'SET_USER',
    user: user
	}
}
