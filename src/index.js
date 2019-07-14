import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

{
  let host = location.host
  let path = location.pathname
  window.requestInfo = { host, path }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
