const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
}

let notificationTimeout = null;
export const setNotification = (notification, time) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), time * 1000)
  }
}


export default reducer;