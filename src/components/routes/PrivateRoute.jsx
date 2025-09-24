import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ roles }) => {
  const { user, loading } = useContext(AuthContext);

  // While fetching current user, show nothing or a spinner
  if (loading) return <div>Loading...</div>;

  // If not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user's role is not included
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // All checks passed, render nested routes
  return <Outlet />;
};

export default PrivateRoute;
