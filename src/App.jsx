import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider } from './context/AppContext';
import { Header, Footer, StickyButtons } from './components/common/Layout';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Contact from './pages/Contact';
import OurLegacy from './pages/OurLegacy';
import VehicleDetails from './pages/VehicleDetails';
import './App.css';

function AppContent() {
  useEffect(() => {
    // Trigger scroll animation updates
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f3ee] text-[#2b2b2b]">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Inventory />} />
          <Route path="/cars/:id" element={<VehicleDetails />} />
          <Route path="/inventory" element={<Navigate to="/cars" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<OurLegacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <StickyButtons />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </HelmetProvider>
  );
}
