// src/Callback.js

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = ({ setToken }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');

      console.log('Access Token:', accessToken); // Debugging: Log the token

      if (accessToken) {
        localStorage.setItem('access_token', accessToken); // Store token in local storage
        setToken(accessToken);
        navigate('/'); // Redirect to the home page
      } else {
        throw new Error('Access token not found');
      }
    } catch (error) {
      console.error('Error during the callback handling:', error);
      setError(error.message); // Set error state instead of redirecting
    }
  }, [navigate, setToken]);

  return error ? <div>Error: {error}</div> : null;
};

export default Callback;
