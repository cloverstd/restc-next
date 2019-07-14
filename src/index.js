import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

{
  let host = location.host
  let path = location.pathname
  if (host === 'cloverstd.github.io') {
    host = 'httpbin.org'
    if (path.endsWith('index.html')) {
      path = path.replace(/\/index\.html/, '')
    }
    let paths = path.split('/')
    path = `/${paths.length > 3 ? paths[2] : 'get'}`
  }
  window.requestInfo = { host, path }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
