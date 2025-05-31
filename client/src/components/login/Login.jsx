import React, { useState } from 'react';
import { message } from 'antd';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    var x = "test";
  };

  const handleGoogleLogin = async () => {
    var y = "test";
  };

  const handlePasswordReset = async () => {
    var z = "test";
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

      <button onClick={handleGoogleLogin} style={{ marginTop: '10px', backgroundColor: '#4285F4' }}>
        Continue with Google
      </button>

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