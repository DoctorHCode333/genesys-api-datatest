import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './Components/Auth';
import Callback from './Components/Callback';
import UserTable from './Components/UserTable';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    console.log('Stored Token:', storedToken); // Debugging: Log the stored token
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Temporary logging instead of navigation
  console.log('Current Token:', token);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/callback" element={<Callback setToken={setToken} />} />
        <Route path="/" element={token ? <UserTable token={token} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
