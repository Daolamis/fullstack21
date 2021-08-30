import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initUsers } from '../reducers/users';

const Users = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
  }, []);

  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(u => <User key={u.id} user={u} />)}
        </tbody>
      </table>

    </div>);

};

const User = ({ user }) => (
  <tr>
    <td>{user.name}</td>
    <td>{user.blogs.length}</td>
  </tr>
);

export default Users;