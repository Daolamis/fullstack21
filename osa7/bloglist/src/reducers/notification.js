
const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let timeout = null;
export const setNotification = (message, isError) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, isError }
    });
    clearTimeout(timeout);
    timeout = setTimeout(() => dispatch(
      { type: 'CLEAR_NOTIFICATION' }), 5000);
  };

};

export default reducer;