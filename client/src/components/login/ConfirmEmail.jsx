import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { message } from 'antd';

const ConfirmEmail = ({ email, onConfirmed = () => {} }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await Auth.confirmSignUp(email, code);
      message.success('Email confirmed! You can now log in.');
      onConfirmed(); // optional callback: switch to login screen
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResendCode = async () => {
    try {
      await Auth.resendSignUp(email);
      message.success('Verification code resent!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <form onSubmit={handleConfirm}>
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Confirm Email</button>
      </form>

      <button onClick={handleResendCode} style={{ marginTop: '10px' }}>
        Resend Code
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default ConfirmEmail;
