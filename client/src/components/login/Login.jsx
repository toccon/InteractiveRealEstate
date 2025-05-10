// src/Login.jsx
import React from 'react';
import { useAuth } from './AuthContext';
import { message } from 'antd';

const Login = ({ onSuccess = () => {} }) => {
  const { login, isAuthenticated, isLoading } = useAuth();

  const handleLogin = async () => {
    try {
      await login(); 
    } catch (err) {
      console.error(err);
      message.error('Login failed or was cancelled.');
    }
  };

  return (
    <div className="auth-form-wrapper">
      <button onClick={handleLogin}>
        Login / Register with Cognito
      </button>

      {isLoading && <p style={{ marginTop: '10px' }}>Checking login status...</p>}
      {isAuthenticated && <p style={{ marginTop: '10px' }}>You are already logged in ✅</p>}
    </div>
  );
};

export default Login;
