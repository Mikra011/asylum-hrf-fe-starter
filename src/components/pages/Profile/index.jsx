import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * TODO: Ticket 3:
 * Implement authentication using Auth0:
 * - Get the user data from Auth0
 * - Create and style the component
 * - Display the data
 * - Make this page a protected Route
 */
const Profile = () => {
  // TODO: Replace these with functionality from Auth0
  const { isLoading, user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center p-4 text-lg font-semibold'>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center p-4 text-lg font-semibold'>
          User not found
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 py-10'>
      <div className='max-w-sm mx-auto mt-10 bg-white rounded-lg shadow-lg p-6 text-center'>
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name}
            className='w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500'
          />
        )}
        <h2 className='text-2xl font-semibold mb-2'>{user.name}</h2>
        <p className='text-gray-600 mb-4'>{user.email}</p>
        <button
          onClick={handleLogout}
          className='mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
