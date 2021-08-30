import userService from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'USERS_INIT':
      return action.data;
    default:
      return state;
  }
};

export default reducer;

export const initUsers = () => {
  return async dispatch => {
    const users = await userService.getAll();
    dispatch({ type: 'USERS_INIT', data: users });
  };
};