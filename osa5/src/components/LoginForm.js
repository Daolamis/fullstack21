import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>Username: <input data-cy='username' type='text' value={username} onChange={e => setUsername(e.target.value)} /></div>
        <div>Password: <input data-cy='password' type='password' value={password} onChange={e => setPassword(e.target.value)} /></div>
        <div><button data-cy='submit' type='submit'>login</button></div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;