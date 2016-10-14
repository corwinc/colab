export function setDocId(docId) {
  return {
    type: 'SET_DOC_ID',
    docId
  }
}

export function setCurSharedUsers(users) {
  return {
    type: 'SET_CUR_SHARED_USERS',
    users
  }
}

export function setCurUserInitials(initials) {
  return {
    type: 'SET_CUR_USER_INITIALS',
    initials
  }
}