import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../reducers/user';

const padding = {
  padding: 5
};

const Navigation = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ backgroundColor: 'lightgray' }}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      <span style={padding}>{`${user.name} logged in`} <button onClick={handleLogout}>logout</button></span>
    </div>
  );
};

export default Navigation;