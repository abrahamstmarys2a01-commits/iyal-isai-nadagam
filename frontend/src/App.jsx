import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingActions from './components/FloatingActions';
import { LanguageProvider } from './context/LanguageContext';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Enquiry from './pages/Enquiry';

// Styles
import './styles/global.css';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/enquiry" element={<Enquiry />} />
              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <FloatingActions />
        </div>
      </Router>
    </LanguageProvider>
  );
}
