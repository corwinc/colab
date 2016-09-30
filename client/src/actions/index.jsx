export function selectBook(book) {
	// console.log('A book has been selected', book.title);
	return {
		type:'BOOK_SELECTED',
		payload: book
	}
}

//note

//we have to make sure this action creator actually hooked up to the redux


/*
  export function login(userCredentials) {
  return (dispatch) => {
    dispatch(authInit());
    return fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(userCredentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => {
      dispatch(authSuccess(data));
    })
    .catch(err => {
      dispatch(authFailure(err));
    });
  };
}

*/