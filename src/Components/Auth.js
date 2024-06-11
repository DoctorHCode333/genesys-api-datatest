// src/Auth.js

import { useEffect } from 'react';

const Auth = () => {
  const CLIENT_ID = 'e0b35ccc-9d53-4f49-9850-902b2a2c4213'; // Replace with your Genesys Cloud OAuth client ID
  const REDIRECT_URI = 'http://localhost:3000/callback'; // Your redirect URI

  useEffect(() => {
    const AUTH_URL = `https://login.mypurecloud.com/oauth/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

    try {
      window.location.href = AUTH_URL;
    } catch (error) {
      console.error('Error during the authentication redirect:', error);
      // Optionally handle the error, e.g., display a message to the user
    }
  }, []);

  return null;
};

export default Auth;

