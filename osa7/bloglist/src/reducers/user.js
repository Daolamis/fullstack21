import { setNotification } from './notification';
import blogService from '../services/blogs';
import loginService from '../services/login';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_INIT':
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export default reducer;

export const initUser = () => {
  return async dispatch => {
    const userJson = window.localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      dispatch({
        type: 'USER_INIT',
        data: user
      });
      blogService.setToken(user.token);
    }
  };
};

export const login = (loginData) => {
  return async dispatch => {
    try {
      const user = await loginService.login(loginData);
      window.localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: 'LOGIN',
        data: user
      });
      blogService.setToken(user.token);
    } catch (e) {
      dispatch(setNotification('wrong username or password', true));
    }
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch({ type: 'LOGOUT' });
    window.localStorage.removeItem('user');
  };
};