// src/client/profile/Profile.jsx
import React from 'react';
import { message } from 'antd';

const ProfilePage = () => {

  const handleLogout = async () => {
    var x = "test";
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>My Profile</h2>
      <div style={{ marginBottom: '1rem' }}>
        <p><strong>Email:</strong> testEmail</p>
        <p><strong>Plan:</strong> testPlan</p>
        <p>
          <strong>Email Verified:</strong>{' '}
          {false ? (
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
