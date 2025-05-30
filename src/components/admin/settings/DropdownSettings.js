// src/components/DropdownSettings.js
import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/config';
import { doc, getDoc, setDoc, getDocs, collection } from 'firebase/firestore';
import './DropdownSettings.css'; // ✅ No change needed — still local

export default function DropdownSettings() {
  const [fieldKey, setFieldKey] = useState('');
  const [optionsInput, setOptionsInput] = useState('');
  const [message, setMessage] = useState('');
  const [existingKeys, setExistingKeys] = useState([]);

  useEffect(() => {
    const fetchKeys = async () => {
      const snapshot = await getDocs(collection(db, 'dropdownOptions'));
      setExistingKeys(snapshot.docs.map(doc => doc.id));
    };
    fetchKeys();
  }, []);

  const handleSave = async () => {
    if (!fieldKey.trim()) return setMessage('Field key is required.');
    const options = optionsInput.split(',').map(opt => opt.trim()).filter(opt => opt);
    if (options.length === 0) return setMessage('Please enter at least one option.');

    await setDoc(doc(db, 'dropdownOptions', fieldKey), { options });
    setMessage(`Saved options for "${fieldKey}"`);
    if (!existingKeys.includes(fieldKey)) {
      setExistingKeys([...existingKeys, fieldKey]);
    }
  };

  const handleLoad = async (key) => {
    const snap = await getDoc(doc(db, 'dropdownOptions', key));
    if (snap.exists()) {
      setFieldKey(key);
      setOptionsInput(snap.data().options.join(', '));
    }
  };

  return (
    <div className="dropdown-settings">
      <h2>Dropdown Settings</h2>
      
      <div className="form-row">
        <label>Field Key:</label>
        <input
          value={fieldKey}
          onChange={(e) => setFieldKey(e.target.value)}
          placeholder="e.g., gender"
        />
      </div>

      <div className="form-row">
        <label>Options (comma-separated):</label>
        <input
          value={optionsInput}
          onChange={(e) => setOptionsInput(e.target.value)}
          placeholder="e.g., Male, Female, Other"
        />
      </div>

      <button className="save-btn" onClick={handleSave}>Save Options</button>

      {message && <div className="message">{message}</div>}

      <div className="existing-keys">
        <h4>Existing Dropdown Fields:</h4>
        <ul>
          {existingKeys.map(key => (
            <li key={key}>
              <button className="load-btn" onClick={() => handleLoad(key)}>
                {key}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

