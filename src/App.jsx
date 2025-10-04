import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AddressList from './components/AddressList';
import AddressForm from './components/AddressForm';


export default function App() {
  return (
    <div className="app-container">
      <nav className="nav">
      <h1 className="logo">Address Book</h1>
      <div>
        <Link className="nav-link" to="/addresses">Addresses</Link>
        <Link className="nav-link primary" to="/form">Add Address</Link>
      </div>
      </nav>


      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/addresses" replace />} />
          <Route path="/addresses" element={<AddressList />} />
          <Route path="/form" element={<AddressForm />} />
          <Route path="/form/:id" element={<AddressForm />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </main>


      <footer className="footer">Address-App</footer>
    </div>
  );
}