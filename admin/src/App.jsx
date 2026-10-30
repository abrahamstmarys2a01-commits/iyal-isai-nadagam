import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Route Guards
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ManageEvents from './pages/ManageEvents';
import ManageEnquiries from './pages/ManageEnquiries';
import ManageGallery from './pages/ManageGallery';
import ContactSettings from './pages/ContactSettings';

// Styles
import './styles/global.css';
import './styles/admin.css';
import './styles/forms.css';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/events" element={<AdminLayout><ManageEvents /></AdminLayout>} />
          <Route path="/enquiries" element={<AdminLayout><ManageEnquiries /></AdminLayout>} />
          <Route path="/gallery" element={<AdminLayout><ManageGallery /></AdminLayout>} />
          <Route path="/settings" element={<AdminLayout><ContactSettings /></AdminLayout>} />
        </Route>

        {/* Redirect aliases */}
        <Route path="/admin" element={<Navigate to="/" replace />} />
        <Route path="/admin/*" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
