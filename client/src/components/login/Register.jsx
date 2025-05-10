// src/Register.jsx
import React from 'react';
import { useAuth } from './AuthContext';
import { message } from 'antd';

const Register = ({ onSuccess = () => {} }) => {
  const { login, isLoading, isAuthenticated } = useAuth();

  const handleRegister = async () => {
    try {
      await login(); // Triggers redirect to Cognito Hosted UI
    } catch (err) {
      console.error(err);
      message.error('Registration failed or was cancelled.');
    }
  };

  return (
    <div className="auth-form-wrapper">
      <p>Create your account securely using Cognito.</p>
      <button onClick={handleRegister}>Continue to Registration</button>

      {isLoading && <p style={{ marginTop: '10px' }}>Loading...</p>}
      {isAuthenticated && <p style={{ marginTop: '10px' }}>You're already logged in ✅</p>}
    </div>
  );
};

export default Register;
