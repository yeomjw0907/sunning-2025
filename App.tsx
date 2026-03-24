import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Landing from './pages/Landing';
import DocumentPage from './pages/DocumentPage';
import RouteTracker from './components/RouteTracker';
import PopupBanner from './components/PopupBanner';
import RequireAdmin from './components/admin/RequireAdmin';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminPopups from './pages/admin/AdminPopups';

function App() {
  return (
    <div className="font-sans text-slate-900 bg-gray-50 selection:bg-suning-accent selection:text-black">
      <BrowserRouter>
        <RouteTracker />
        <Topbar />
        <PopupBanner />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/document/:slug" element={<DocumentPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <RequireAdmin>
                <AdminTestimonials />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/popups"
            element={
              <RequireAdmin>
                <AdminPopups />
              </RequireAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;