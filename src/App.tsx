/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Heritage from './pages/Heritage';
import Kitchen from './pages/Kitchen';
import Travel from './pages/Travel';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Shop from './pages/Shop';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'motion/react';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-expect-error - key is required for AnimatePresence to work with Routes */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="heritage" element={<Heritage />} />
          <Route path="kitchen" element={<Kitchen />} />
          <Route path="travel" element={<Travel />} />
          <Route path="admin" element={<Admin />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
