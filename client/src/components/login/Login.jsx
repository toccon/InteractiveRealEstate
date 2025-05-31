import React, { useState } from 'react';
import { auth, db } from './firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { message } from 'antd';

const Login = ({ onSuccess = () => {} }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        message.warning('Please verify your email address before accessing all features.');
      }

      message.success('Login successful! 🎉');
      onSuccess();
    } catch (err) {
      console.error(err);
      message.error(err.message || 'Login failed.');
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Check if user profile exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (!userDocSnap.exists()) {
        // If not, create a profile
        await setDoc(userDocRef, {
            email: user.email,
            emailVerified: user.emailVerified,
            createdAt: new Date(),
            plan: 'free',
          });
      }
  
      message.success('Google login successful! 🎉');
      onSuccess();
    } catch (err) {
      console.error(err);
      message.error(err.message || 'Google login failed.');
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      message.error('Please enter your email first.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      message.success('Password reset email sent! 📧');
    } catch (err) {
      console.error(err);
      message.error(err.message || 'Failed to send reset email.');
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