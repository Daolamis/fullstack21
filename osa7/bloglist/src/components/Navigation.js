import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Button, StyledNavigation } from './components.styled';
import { logout } from '../reducers/user';


const padding = {
  padding: 5
};

const Navigation = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    history.replace('/');
  };

  return (
    <StyledNavigation>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      <span style={padding}>{`${user.name} logged in`} <Button onClick={handleLogout}>logout</Button></span>
    </StyledNavigation>
  );
};

export default Navigation;