// src/client/profile/Profile.jsx
import React from 'react';
import { useAuth } from '../login/AuthContext';
import { message } from 'antd';

const ProfilePage = () => {
  const { currentUser, userData, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      message.success('Logged out successfully!');
      window.location.reload(); // Simple way to trigger re-render for now
    } catch (err) {
      console.error(err);
      message.error('Logout failed.');
    }
  };

  if (!currentUser || !userData) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading profile...</div>;
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>My Profile</h2>
      <div style={{ marginBottom: '1rem' }}>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Plan:</strong> {userData.plan}</p>
        <p>
          <strong>Email Verified:</strong>{' '}
          {userData.emailVerified ? (
            <span style={{ color: 'green', fontWeight: 'bold' }}>✔ Verified</span>
          ) : (
            <span style={{ color: 'red' }}>❌ Not Verified</span>
          )}
        </p>
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
