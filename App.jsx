import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About'; // <-- 1. Import the About page
import Checkin from './pages/CheckIn';
import Training from './pages/Training';
import Results from './pages/Results';
import Complete from './pages/Complete';
import Progress from './pages/Progress';
import SafetyHelp from './pages/SafetyHelp';
import Settings from './pages/Settings';

// 1. The Protected Route Guard
const ProtectedRoute = () => {
  // Check if the user is authenticated in localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  // If not authenticated, redirect to login. If yes, render the child routes (Outlet).
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} /> 
            
            {/* 2. Add the About route here */}
            <Route path="about" element={<About />} />
            
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings />} />
            <Route path="safety" element={<SafetyHelp />} />
            <Route path="checkin" element={<Checkin />} />
            <Route path="training" element={<Training />} />
            <Route path="results" element={<Results />} />
            <Route path="post-checkin" element={<Checkin mode="post" />} />
            <Route path="complete" element={<Complete />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;