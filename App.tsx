import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import Landing from './pages/Landing';
import DocumentPage from './pages/DocumentPage';

function App() {
  return (
    <div className="font-sans text-slate-900 bg-gray-50 selection:bg-suning-accent selection:text-black">
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/document/:slug" element={<DocumentPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;