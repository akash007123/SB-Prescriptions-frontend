import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrescriptionsPage from './pages/PrescriptionsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prescriptions" element={<PrescriptionsPage />} />
    </Routes>
  );
}
