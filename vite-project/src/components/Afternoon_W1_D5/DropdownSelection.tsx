import React, { useState } from 'react';

export default function DropdownSelection() {
  const [selectedFruit, setSelectedFruit] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedFruit(event.target.value);
    console.log('Selected fruit:', event.target.value);
  };

  return (
    <div>
      <select value={selectedFruit} onChange={handleChange}>
        <option value="">Select a fruit</option>
        <option value="Apple">Apple</option>
        <option value="Banana">Banana</option>
        <option value="Orange">Orange</option>
      </select>
      <p>Selected fruit: {selectedFruit || 'None'}</p>
    </div>
  );
}