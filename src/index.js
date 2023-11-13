import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import authentication from '@kdpw/msal-b2c-react';

console.log("tenantName=" + process.env.REACT_APP_TENANT_NAME);
console.log("signInPolicy=" + process.env.REACT_APP_SIGN_IN_POLICY);
console.log("applicationId=" + process.env.REACT_APP_APPLICATION_ID);
console.log("redirectUri=" + process.env.REACT_APP_REDIRECT_URI);

authentication.initialize({
    instance: `https://${process.env.REACT_APP_TENANT_NAME}.b2clogin.com/tfp/`,
    tenant: `${process.env.REACT_APP_TENANT_NAME}.onmicrosoft.com`,
    signInPolicy: process.env.REACT_APP_SIGN_IN_POLICY,
    applicationId: process.env.REACT_APP_APPLICATION_ID,
    cacheLocation: 'sessionStorage',
    scopes: ['profile', 'openid'],
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    validateAuthority: false
});

authentication.run(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
    //ReactDOM.createRoot(document.getElementById("root")).render(<App />);
});
