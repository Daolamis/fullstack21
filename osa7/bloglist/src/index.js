import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import store from './store';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  body {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  margin-left: auto;
  margin-right: auto;
  margin: 0rem 4rem;
  color: ${theme.fontColor};
  background-color: ${theme.primaryColor};
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </Provider>
  ,
  document.getElementById('root'));