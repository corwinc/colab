import {ADD_FLASH_MESSAGE} from './types.jsx';
export function addFlashMessage(message) {
	return {
		type: ADD_FLASH_MESSAGE,
		message
	}
}