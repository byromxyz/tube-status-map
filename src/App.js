import React from 'react';
import Map from './Map';
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  html {
    box-sizing: border-box;
    font-size: 16px;
  }
  html, body {
    height: 100%;
  }
  #root {
    height: 100%;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0 0 0.5em 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`

const Wrapper = styled.div`
  height: 100%;
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyle />
      <Map />
    </Wrapper>
  );
}

export default App;
