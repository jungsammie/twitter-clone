import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import fbase from "./firebaseConfig";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
