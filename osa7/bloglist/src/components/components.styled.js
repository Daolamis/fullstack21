import { Link } from 'react-router-dom';
import styled from 'styled-components';

import theme from '../theme';

export const Button = styled.button`
  background-color: ${theme.buttonColor};
  color: ${theme.buttonFontColor};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: none;
  border-radius: 3px;
`;

export const RemoveButton = styled(Button)`
  background-color: ${theme.removeButtonColor};
  color: ${theme.removeButtonFontColor};
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${theme.fontColor};

  :hover{
    color:green;
  }
`;

export const StyledNavigation = styled.div`
  font-size: 1.25rem;
  background-color: ${theme.navColor};
`;


export const InlineBlock = styled.div`
  display: inline-block;
  width: 5rem;
  padding: 0.25rem;
  margin: 0 0.25rem;
`;

export const Section = styled.div`
  padding: 0%.25rem;
  background-color: ${theme.secondaryColor};
`;

export const StyledNotification = styled.div`
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.25rem;
  margin: 5px;
  padding: 5px;
  border: 2px solid ${p => p.error ? 'red' : 'green'};
  color: ${p => p.error ? 'darkred' : 'darkgreen'};
  background-color: ${p => p.error ? 'pink' : 'lightgreen'};
`;

export const Table = styled.table`
border-collapse: collapse;

th {
  font-weight: 800;
}

td {
  min-width: 3rem;
  padding: 0.25rem;
  border-bottom: 1px solid ${theme.primaryColor};
}

`;
