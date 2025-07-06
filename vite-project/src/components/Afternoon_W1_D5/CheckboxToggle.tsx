import React, { useState } from 'react';

export default function CheckboxStatus() {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsChecked(prev => !prev);
    console.log('Checkbox is now:', !isChecked ? 'checked' : 'unchecked');
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        Toggle me
      </label>
      <p>Checkbox is: {isChecked ? 'checked' : 'unchecked'}</p>
    </div>
  );
}
