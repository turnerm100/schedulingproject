// src/components/forms/staff/StaffContactInfo.js

import React from 'react';

export default function StaffContactInfo({ formData, setFormData }) {
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [section]: {
          ...prev.contact[section],
          [field]: value
        }
      }
    }));
  };

  const handleSimpleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [name]: value }
    }));
  };

  const contact = formData.contact;

  return (
    <div className="staff-contact-info">
      <label>Work Phone: <input name="workPhone" value={contact.workPhone} onChange={handleSimpleChange} /></label>
      <label>Home Phone: <input name="homePhone" value={contact.homePhone} onChange={handleSimpleChange} /></label>
      <label>Email Address: <input name="email" value={contact.email} onChange={handleSimpleChange} /></label>

      <h4>Home Address</h4>
      <input placeholder="Address" value={contact.homeAddress.line1} onChange={(e) => handleChange('homeAddress', 'line1', e.target.value)} />
      <input placeholder="City" value={contact.homeAddress.city} onChange={(e) => handleChange('homeAddress', 'city', e.target.value)} />
      <input placeholder="State" value={contact.homeAddress.state} onChange={(e) => handleChange('homeAddress', 'state', e.target.value)} />
      <input placeholder="Zip Code" value={contact.homeAddress.zip} onChange={(e) => handleChange('homeAddress', 'zip', e.target.value)} />

      <h4>Shipping Address</h4>
      <input placeholder="Address" value={contact.shippingAddress.line1} onChange={(e) => handleChange('shippingAddress', 'line1', e.target.value)} />
      <input placeholder="City" value={contact.shippingAddress.city} onChange={(e) => handleChange('shippingAddress', 'city', e.target.value)} />
      <input placeholder="State" value={contact.shippingAddress.state} onChange={(e) => handleChange('shippingAddress', 'state', e.target.value)} />
      <input placeholder="Zip Code" value={contact.shippingAddress.zip} onChange={(e) => handleChange('shippingAddress', 'zip', e.target.value)} />
    </div>
  );
}
