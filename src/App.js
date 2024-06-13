import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './Components/Auth';
import Callback from './Components/Callback';
import DataTable from './Components/DataTable';
import PerformanceData from './Components/PerformanceData';
import './App.css';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/callback" element={<Callback setToken={setToken} />} />
          <Route path="/" element={token ? (
            <div>
              <h1>Welcome to Genesys Cloud Dashboard</h1>
              <div className="user-table">
                <DataTable token={token} />
              </div>
              <div className="chart-container">
                <PerformanceData token={token} />
              </div>
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