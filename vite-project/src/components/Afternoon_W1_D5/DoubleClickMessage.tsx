import React, { useState } from 'react';

export default function DoubleClickMessage() {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleDoubleClick = (): void => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div style={{ padding: '20px', width: 'fit-content' }}>
      <button onDoubleClick={handleDoubleClick}>Double Click Me!</button>
      {showMessage && <p>Double-clicked!</p>}
    </div>
  );
}