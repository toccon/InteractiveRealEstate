// src/client/profile/ProfilePage.jsx
import React from 'react';
import { useAuth } from '../login/AuthContext';
import { message } from 'antd';

const ProfilePage = () => {
  const { currentUser, isAuthenticated, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      message.success('Logged out successfully!');
    } catch (err) {
      console.error(err);
      message.error('Logout failed.');
    }
  };

  if (isLoading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading profile...</div>;
  }

  if (!isAuthenticated || !currentUser) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>You are not logged in.</div>;
  }

  const profile = currentUser?.profile || {};
  const email = profile?.email || 'N/A';
  const sub = profile?.sub || 'N/A';
  const emailVerified = profile?.email_verified ? '✔ Verified' : '❌ Not Verified';
  const plan = profile?.['custom:plan'] || 'free';

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>My Profile</h2>
      <div style={{ marginBottom: '1rem' }}>
        <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>User ID (sub):</strong> {sub}</p>
        <p><strong>Email Verified:</strong> {emailVerified}</p>
        <p><strong>Subscription Plan:</strong> {plan}</p>
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          backgroundColor: '#003366',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
