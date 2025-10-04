import React, { useContext } from 'react';
import { AddressContext } from '../context/AddressContext';
import { useNavigate } from 'react-router-dom';


export default function AddressList() {
const { addresses, deleteAddress } = useContext(AddressContext);
const nav = useNavigate();


return (
    <div className="page">
      <div className="page-header">
        <h2>Saved Addresses</h2>
        <button className="btn" onClick={() => nav('/form')}>Add New</button>
      </div>


      {addresses.length === 0 ? (
      <div className="empty">Please Add Address Here</div>
      ) : (
        <div className="grid">
          {addresses.map(a => (
            <div className="card" key={a.id}>
              <div className="card-body">
              <h3 className="name">{a.fullName}</h3>
              <div className="meta">{a.phone}</div>
              <div className="addr">{a.street}</div>
            </div>


            <div className="card-actions">
              <button className="btn small" onClick={() => nav(`/form/${a.id}`)}>Edit</button>
              <button className="btn small danger" onClick={() => deleteAddress(a.id)}>Delete</button>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  );
}