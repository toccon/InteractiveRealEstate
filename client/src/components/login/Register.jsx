import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { message } from 'antd';
import ConfirmEmail from './ConfirmEmail';

const Register = ({ onSuccess = () => {} }) => {
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  // Clear error whenever email or password changes
  useEffect(() => {
    setError('');
  }, [email, password]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      setShowConfirm(true); // show confirmation input
    } catch (err) {
      setError(err.message);
    }
  };

  const onEmailConfirmed = () => {
    setShowConfirm(false); // hide confirmation input
  }

  return (
    showConfirm ? (
      <ConfirmEmail email={email} onConfirmed={onEmailConfirmed} />
    ) : (
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
  ));
};

export default Register;
