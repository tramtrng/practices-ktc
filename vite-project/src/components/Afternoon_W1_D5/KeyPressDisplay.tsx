import React, { useState } from 'react';

export default function KeyPressDisplay() {
  const [lastKey, setLastKey] = useState<string>('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setLastKey(event.key);
  };

  return (
    <div>
      <input type="text" onKeyDown={handleKeyDown} />
      <p>Last key: {lastKey || 'None'}</p>
    </div>
  );
}