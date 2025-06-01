import { useDispatch } from "react-redux";
import { selectTab } from '../../redux/slices/selectedTabSlice'; 
import { useAuth } from '../login/AuthContext';
import { message } from 'antd';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut();
      message.success('Logged out successfully!');
      dispatch(selectTab('explore')); // Redirect to explore tab after logout
    } catch (err) {
      message.error('Logout failed.');
      console.error(err);
    }
  };

  if (!user) {
    return <p style={{ textAlign: 'center', paddingTop: '2rem' }}>Loading user info...</p>;
  }

  const { email, email_verified, ...rest } = user.attributes;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>My Profile</h2>

      <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        <p><strong>Email:</strong> {email}</p>
        <p>
          <strong>Email Verified:</strong>{' '}
          {email_verified ? (
            <span style={{ color: 'green', fontWeight: 'bold' }}>✔ Verified</span>
          ) : (
            <span style={{ color: 'red' }}>❌ Not Verified</span>
          )}
        </p>

        {/* Display any additional attributes */}
        {Object.entries(rest).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
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
