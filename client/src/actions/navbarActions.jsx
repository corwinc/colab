export function setUserId(userId) {
  return {
    type: 'SET_USER_ID',
    userId
  }
}

export function SetCurSharedUsers(users) {
  return {
    type: 'SET_CUR_SHARED_USERS',
    users
  }
}