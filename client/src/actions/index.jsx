export function selectBook(book) {
	// console.log('A book has been selected', book.title);
	return {
		type:'BOOK_SELECTED',
		payload: book
	}
}

//note

//we have to make sure this action creator actually hooked up to the redux
