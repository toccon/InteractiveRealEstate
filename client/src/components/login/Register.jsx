import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { message } from 'antd';

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
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        emailVerified: user.emailVerified,
        createdAt: new Date(),
        plan: 'free',
      });

      // Notify success
      message.success('Registration successful! 📩 Please check your email to verify your account.');

      // Reset form and errors
      setEmail('');
      setPassword('');
      setError('');

      onSuccess(); // Close modal
    } catch (err) {
      console.error(err);
      message.error(err.message || 'Registration failed.');
      setError(err.message);
    }
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
