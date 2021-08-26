const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.notification
    case 'HIDE':
      return null;
    default:
      return state;
  }
}

export const showNotification = (notification) => {
  return {
    type: 'SHOW',
    notification
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
  }
}

export default reducer;