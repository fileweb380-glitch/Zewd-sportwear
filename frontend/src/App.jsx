import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Products } from './sections/Products';
import { About } from './sections/About';
import { WhyChooseUs } from './sections/WhyChooseUs';
import { Showcase } from './sections/Showcase';
import { CTA } from './sections/CTA';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { MockupShowcase } from './components/mockups/MockupShowcase';

// Admin Components & Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminOverview from './pages/admin/AdminOverview';
import AdminProducts from './pages/admin/AdminProducts';
import AdminProductForm from './pages/admin/AdminProductForm';

// Public Website Layout (Preserves existing design & language system)
const PublicHome = () => {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <About />
        <MockupShowcase />
        <WhyChooseUs />
        <Showcase />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public Website Route */}
          <Route path="/" element={<PublicHome />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/edit/:id" element={<AdminProductForm />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;