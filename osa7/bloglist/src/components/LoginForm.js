import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InlineBlock, Section, Button } from './components.styled';

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
    <Section>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div><InlineBlock>Username:</InlineBlock> <input data-testid='username' type='text' value={username} onChange={e => setUsername(e.target.value)} /></div>
        <div><InlineBlock>Password:</InlineBlock> <input data-testid='password' type='password' value={password} onChange={e => setPassword(e.target.value)} /></div>
        <div><Button type='submit'>login</Button></div>
      </form>
    </Section>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;