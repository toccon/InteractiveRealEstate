import React, { useState } from 'react';
import { message } from 'antd';
import { useAuth } from './AuthContext';

const Login = ({ onSuccess }) => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      message.success('Logged in successfully!');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordReset = async () => {
    setError('');
    try {
      await useAuth.forgotPassword(email);
      message.success('Password reset code sent to your email.');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: '8px' }}>
        <span onClick={handlePasswordReset} style={{ color: '#003366', cursor: 'pointer' }}>
          Forgot Password?
        </span>
      </p>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default Login;