import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import authentication from '@kdpw/msal-b2c-react';

// TENANT NAME: yuhaoadb2ctenant
// redirectUri: https://hyustorageaccount01.z13.web.core.windows.net/ or http://localhost:3001/
authentication.initialize({
    instance: 'https://yuhaoadb2ctenant.b2clogin.com/tfp/',
    tenant: 'yuhaoadb2ctenant.onmicrosoft.com',
    signInPolicy: 'B2C_1_SignUpSignIn',
    applicationId: 'c0fc3f7e-bcc8-420e-bd2d-e3d6f5a569f6',
    cacheLocation: 'sessionStorage',
    scopes: ['profile', 'openid'],
    redirectUri: 'https://hyustorageaccount01.z13.web.core.windows.net/',
    validateAuthority: false
});

authentication.run(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
});

//ReactDOM.render(<App />, document.getElementById('root'));