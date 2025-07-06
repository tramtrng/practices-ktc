import React, { useState } from 'react';

export default function DoubleClickMessage() {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const handleDoubleClick = (): void => {
    console.log('Double-click detected, showing message');
    setShowMessage(true);
    setTimeout(() => {
      console.log('Hiding message after 2 seconds');
      setShowMessage(false);
    }, 2000);
  };

  return (
    <div>
      <button onDoubleClick={handleDoubleClick}>Double Click Me!</button>
      <p>{showMessage ? 'Double-clicked!' : ''}</p>
    </div>
  );
}