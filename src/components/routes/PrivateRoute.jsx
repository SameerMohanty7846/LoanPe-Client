import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ role }) => {
  const { user, loading } = useContext(AuthContext);

  // While fetching current user, show nothing (or a spinner)
  if (loading) return <div>Loading...</div>;

  // If not logged in
  if (!user) {
    alert('Please login to access this page.');
    return <Navigate to="/login" replace />;
  }

  // If role is required and doesn't match
  if (role && user.role !== role) {
    alert('You are not authorized to access this page.');
    return <Navigate to="/login" replace />;
  }

  // All checks passed, render nested routes
  return <Outlet />;
};

export default PrivateRoute;
