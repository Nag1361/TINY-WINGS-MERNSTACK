import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Healthcare from '../pages/Healthcare';
import Parenting from '../pages/Parenting';
import Shopping from '../pages/Shopping';
import Community from '../pages/Community';
import Contact from '../pages/Contact';
import GrowthTracker from '../pages/GrowthTracker';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/healthcare" element={<Healthcare />} />
      <Route path="/parenting" element={<Parenting />} />
      <Route path="/shop" element={<Shopping />} />
      <Route path="/community" element={<Community />} />
      <Route path="/contact" element={<Contact />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/growth-tracker/:childId"
        element={
          <ProtectedRoute>
            <GrowthTracker />
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <div className="container-fluid" style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>404 - Page Not Found</h1>
            <a href="/">Go Home</a>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
