import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

const User = () => {
  const match = useRouteMatch('/users/:id');
  const user = useSelector(state => state.users.find(u => u.id === match.params.id));

  if(!user){
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map(b =>
          <li key={b.id}>{b.title}</li>)
        }
      </ul>
    </div>
  );
};

export default User;