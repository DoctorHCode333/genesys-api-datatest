import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, redirect } from 'react-router-dom';
import Auth from './Components/Auth';
import Callback from './Components/Callback';
import DataTable from './Components/DataTable';
import PerformanceData from './Components/PerformanceData';
// import ConversationDetails from './Components/ConversationDetails';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [expiryTime, setExpiryTime] = useState(localStorage.getItem('tokenExpiry') || '');

  useEffect(() => {
    if (token && expiryTime) {
      localStorage.setItem('token', token);
      localStorage.setItem('tokenExpiry', expiryTime);
     
      const currentTime = new Date().getTime();
      const timeLeft = (expiryTime - currentTime)-1000;

      if (timeLeft > 0) {
        const tokenTimeout = setTimeout(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiry');
          setToken('');
          setExpiryTime('');
        }, timeLeft);

        return () => clearTimeout(tokenTimeout);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        setToken('');
        setExpiryTime('');
       
      }
    }
  }, [token, expiryTime]);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/callback" element={<Callback setToken={(token, expiryTime) => { setToken(token); setExpiryTime(expiryTime); }} />} />
          <Route path="/" element={token ? (
            <div>
              <h1>Welcome to Genesys Cloud Dashboard</h1>
              <div className="user-table">
                /<DataTable token={token} />
              </div>
              <div className="chart-container">
                <PerformanceData token={token} />
              </div>
              {/* <div>
                <ConversationDetails token = {token}/>
              </div> */}
            </div>
          ) : (
            <Navigate to="/login" />
          )} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;