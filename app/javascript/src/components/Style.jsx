import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  violet: '#dae3ff',
  backgroundColor: '#e9ebee',
  black: '#000',
  grey: '#ccc',
  maxWidth: '960px'
};

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  font-size: 10px;
  height: 100%;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

a {
  text-decoration: none;
  color: ${props => props.theme.black};
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

input[type="submit"] {
  padding: 1rem;
  border-radius: 3px;
  transition: background 0.5s;
}

input[type="submit"]:hover {
  background: ${props => props.theme.violet};
}

.main-content {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => props.theme.backgroundColor};
  overflow-y: scroll;
}

input:focus {
  outline: none;
  box-shadow: 0 0 0 2px ${props => props.theme.violet};
}

input {
  font-size: 1.3rem;
}
`;

const NavStyle = createGlobalStyle`
nav.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: solid ${props => props.theme.grey} 1px;
  box-shadow: 0 1px 1px ${props => props.theme.grey};
}

.main-nav span {
  font-size: 2rem;
}
`;

const FooterStyle = createGlobalStyle`
.footer {
  font-style: italic;
  font-size: 1.4rem;
  height: 3rem;
  padding-left: 1rem;
  background-color: ${props => props.theme.black};
  color: white;
}

.footer a {
  color: ${props => props.theme.violet};
  transition: color 0.2s ease-in-out;
}

.footer a:hover {
  color: rgba(170, 194, 247, 0.708);
}

.footer .heart {
  color: white;
  transition: color 0.2s ease-in-out;
}

.footer .heart:hover {
  color: red;
}
`;

const ContentStyle = createGlobalStyle`
.content {
  padding: 3rem;
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  align-self: center;
  height: 100%;
  background-color: transparent;
}

.content input {
  height: 4rem;
  border-radius: 3px;
}
`;

export default function Style({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <NavStyle />
        <ContentStyle />
        <FooterStyle />
        {children}
      </>
    </ThemeProvider>
  );
}
