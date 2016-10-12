import thunk from 'redux-thunk';
import promise from 'redux-promise';

// DEMO
export function addComment(comment) {
  return {
    type: 'ADD_COMMENT',
    comment
  }
}

export function addCommentToComments(comment) {
  return {
    type: 'ADD_COMMENT_TO_COMMENTS',
    comment
  }
}

// ADD COMMENTS TO STATE ON GETCOMMENTS SUCCESS

export function getComments() {
  return {
    type: 'GET_COMMENTS'
  }
}

export function getCommentsSuccess(comments) {
  return {
    type: 'GET_COMMENTS_SUCCESS',
    comments
  }
}

export function getCommentsError(error) {
  return {
    type: 'GET_COMMENTS_ERROR',
    error
  }
}

export function handleCommentInput(input) {
  console.log('HANDLE COMMENT handleCommentInput, input:', input);
  return {
    type: 'HANDLE_COMMENT_INPUT',
    input
  }
}

export function updateCommentHeight(height) {
  console.log('HANDLE COMMENT updateCommentHeight, height:', height);
  return {
    type: 'UPDATE_COMMENT_HEIGHT',
    height
  }
}



//////// NEW


// var p = new Promise(function(resolve, reject) {
  
//   // Do an async task async task and then...

//   if(/* good condition */) {
//     resolve('Success!');
//   }
//   else {
//     reject('Failure!');
//   }
// });

// p.then(function() { 
//   /* do something with the result */
// }).catch(function() {
//   /* error :( */
// })

export function handleCommentInputThenHeight(input) {
  // console.log('HANDLE COMMENT handleCommentInputThenHeight, input:', input);
  return dispatch => {
    // console.log('HANDLE COMMENT about to dispatch handleCommentInputP, input:', input);
     return dispatch(handleCommentInputP(input))
      .then((inputRes) => {
        dispatch(updateCommentHeightAfterInput(inputRes));
        dispatch(activeCommentStatus(true));
      })
  }
}

export function handleCommentInputP(input) {
  // console.log('HANDLE COMMENT handleCommentInputP, input:', input);
  const handleInputPromise = new Promise((resolve) => {

    // console.log('HANDLE COMMENT inside handleInputPromise')
    return {
      type: 'HANDLE_COMMENT_INPUT',
      input
    };
  } );
  return handleInputPromise;
}

export function updateCommentHeightAfterInput(input) {
  console.log('HANDLE COMMENT updateCommentHeightAfterInput, input:', input);
  if (input !== '') {
    return {
      type: 'UPDATE_COMMENT_HEIGHT_AFTER_INPUT',
      height: 70
    } 
  } else {
    return {
      type: 'UPDATE_COMMENT_HEIGHT_AFTER_INPUT',
      height: 50
    }
  }
}


///

export function activeCommentStatus(bool) {
  console.log('HANDLE COMMENT activeCommentStatus, bool:', bool);
  return {
    type:'ACTIVE_COMMENT_STATUS',
    bool
  }
}

export function postEntry(entry) {
  return {
    type: 'POST_ENTRY',
    entry
  }
}

export function postEntrySuccess(data) {
  return {
    type: 'POST_ENTRY_SUCCESS',
    data
  }
}

export function postEntryError(err) {
  return {
    type: 'POST_ENTRY_ERROR',
    err
  }
}

export function cancelEntry() {
  return {
    type: 'CANCEL_ENTRY'
  }
}

// in reducer: toggle commentclick & if true, turn off all others
export function handleCommentClick() {
  return {
    type: 'HANDLE_COMMENT_CLICK'
  }
}

export function setNewCommentStatus(status) {
  return {
    type: 'SET_NEW_COMMENT_STATUS',
    status
  }
}

