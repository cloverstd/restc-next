import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
  height: 100%;
  overflow: hidden;
}
body {
  margin: 0;
  height: 100%;
  background: #fff;
  color: #4c555a;
  font-family: "Alright Sans LP", "Avenir Next", "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Source Han Sans SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi MicroHei", sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  line-height: 26px;
}
pre, code {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
}
#root {
  height: 100%;
}
`

const AppStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

class App extends Component {
  render() {
    return (
        <AppStyle>
          <GlobalStyle />
          <Header />
          <Main />
        </AppStyle>
    );
  }
}

export default App;
