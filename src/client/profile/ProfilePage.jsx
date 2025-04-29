import React, { useEffect, useState } from 'react';
import { useAuth } from '../login/AuthContext';
import { db } from '../login/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { message } from 'antd';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (err) {
          console.error(err);
          message.error('Failed to load profile.');
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    message.success('Logged out successfully!');
    window.location.reload(); // simple refresh for now
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Profile</h2>
      {userData && (
        <div style={{ marginBottom: '1rem' }}>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Plan:</strong> {userData.plan}</p>
          <p><strong>Email Verified:</strong> {userData.emailVerified ? "Yes" : "No"}</p>
        </div>
      )}
      <button onClick={handleLogout} style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: '#003366', color: 'white', fontWeight: 'bold', border: 'none' }}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
