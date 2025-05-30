import React, { useEffect } from 'react';
import seedDropdowns from '../utils/seedDropdownOptions';

export default function SeedRunner() {
  useEffect(() => {
    seedDropdowns();
  }, []);

  return <div>Seeding dropdowns... Check the console.</div>;
}
