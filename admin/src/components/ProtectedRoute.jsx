import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = sessionStorage.getItem('kalamanram_admin_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
