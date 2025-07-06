import React, { useState } from 'react';

export default function InputFieldTracker() {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>You typed: {inputValue || 'nothing'}</p>
    </div>
  );
}