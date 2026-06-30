// src/App.js
import React from 'react';
import './App.css';
import Footer from './header-footer/Footer';
import Header from './header-footer/Header';
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from './components/Home';
import About from './components/About';
import Service from './components/Service';
import Shop from './components/Shop';
import Cart from './components/Cart';
import CheckOut from './components/CheckOut';
import MyAccount from './components/MyAccount';
import Wishlist from './components/Wishlist';
import ShopDetails from './components/ShopDetails';
import Contact from './components/Contact';

import { ShopProvider } from './context/ShopContext';
import ChatBot from './chatbot/ChatBot';
import ContactTab from './components/ContactTab';

function App() {
  return (
    <ShopProvider>
      <HashRouter>
        <Header />

        <main style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop-detail" element={<ShopDetails />} />
          </Routes>
        </main>

        <Footer />

        {/* Floating Components */}
        <ContactTab />
        <ChatBot />
      </HashRouter>
    </ShopProvider>
  );
}

export default App;