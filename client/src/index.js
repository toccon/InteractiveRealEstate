import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { AuthProvider } from 'react-oidc-context';

const oidcConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_SdpyPZcEq",
  client_id: "spbtf78pmarmt6q4um9omeu10",
  redirect_uri: "http://localhost:3000/",
  response_type: "code",
  scope: "phone openid email",
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);