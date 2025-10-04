import React, { createContext, useEffect, useState } from 'react';
export const AddressContext = createContext();

const STORAGE_KEY = 'addresses_v1';

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse localStorage', e);
    return [];
  }
});


useEffect(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
}, [addresses]);


function addAddress(addr) {
  setAddresses(prev => [{ ...addr, id: Date.now().toString() }, ...prev]);
}


function updateAddress(id, data) {
  setAddresses(prev => prev.map(a => (a.id === id ? { ...a, ...data } : a)));
}


function deleteAddress(id) {
  setAddresses(prev => prev.filter(a => a.id !== id));
}

function getById(id) {
  return addresses.find(a => a.id === id) || null;
}


return (
  <AddressContext.Provider value={{ addresses, addAddress, updateAddress, deleteAddress, getById }}>
    {children}
  </AddressContext.Provider>
);
}