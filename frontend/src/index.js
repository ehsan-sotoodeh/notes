import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Auth0Provider } from "@auth0/auth0-react";

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Kalam:700','Nerko One','Patrick Hand','Handlee', 'sans-serif']
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    domain= {process.env.REACT_APP_AUTH0_DOMAIN}
    clientId = {process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    scope="read:current_user update:current_user_metadata"
    >
      <App />

    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
