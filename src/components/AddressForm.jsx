import React, { useContext, useEffect, useState } from 'react';
import { AddressContext } from '../context/AddressContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function AddressForm() {
  const { addAddress, updateAddress, getById } = useContext(AddressContext);
  const nav = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({ fullName: '', phone: '', street: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const existing = getById(id);
      if (existing) setForm({ fullName: existing.fullName, phone: existing.phone, street: existing.street });
    }
  }, [id, getById]);

  function validate() {
    const e = {};
    const phoneRe = /^[0-9]{7,15}$/;
    if (!form.fullName.trim()) e.fullName = 'Full name is required.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    else if (!phoneRe.test(form.phone.trim())) e.phone = 'Phone should be 10 digits.';
    if (!form.street.trim()) e.street = 'Street address is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    const payload = { fullName: form.fullName.trim(), phone: form.phone.trim(), street: form.street.trim() };
    if (id) updateAddress(id, payload);
    else addAddress(payload);
    nav('/addresses');
  }

  return (
    <div className="page">
      <div className="form-card">
        <h2>{id ? 'Edit Address' : 'Add Address'}</h2>
        <form onSubmit={onSubmit} noValidate>
          <label>
            Full Name
            <input value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
            {errors.fullName && <div className="error">{errors.fullName}</div>}
          </label>

          <label>
            Phone Number
            <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            {errors.phone && <div className="error">{errors.phone}</div>}
          </label>

          <label>
            Street Address
            <textarea value={form.street} onChange={e => setForm(f => ({ ...f, street: e.target.value }))} rows={3} />
            {errors.street && <div className="error">{errors.street}</div>}
          </label>

          <div className="form-actions">
            <button className="btn" type="submit">Save</button>
            <button type="button" className="btn ghost" onClick={() => nav('/addresses')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}