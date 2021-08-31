import React from 'react';
import { useSelector } from 'react-redux';
import { StyledLink as Link, Section, Table } from './components.styled';

const Users = () => {
  const users = useSelector(state => state.users);

  return (
    <Section>
      <h3>Users</h3>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(u => <User key={u.id} user={u} />)}
        </tbody>
      </Table>

    </Section>);

};

const User = ({ user }) => (
  <tr>
    <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
    <td>{user.blogs.length}</td>
  </tr>
);

export default Users;