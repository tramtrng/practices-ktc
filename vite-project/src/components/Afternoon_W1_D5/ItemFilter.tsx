import React, { useState } from 'react';

export default function ItemFilter() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Pineapple'];

  const handleChange = (): void => {
    const input = document.getElementById('search') as HTMLInputElement;
    setSearchTerm(input.value);
  };

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        id="search"
        type="text"
        placeholder="Search fruits..."
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No matching items</li>
        )}
      </ul>
    </div>
  );
}
