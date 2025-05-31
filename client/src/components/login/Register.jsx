import { useState, useEffect } from 'react';

const Register = ({ onSuccess = () => {} }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Clear error whenever email or password changes
  useEffect(() => {
    setError('');
  }, [email, password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    var x = "test";
  };

  return (
    <div className="auth-form-wrapper">
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default Register;
