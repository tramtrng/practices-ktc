import React, { useState } from 'react';

export default function HandlingFormSubmission() {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.alert(`You submitted: ${inputValue}`);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}