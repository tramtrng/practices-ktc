import { useState } from 'react';

export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsOn(prevState => !prevState);
    console.log('Toggled to:', isOn ? 'OFF' : 'ON');
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {isOn ? 'Turn OFF' : 'Turn ON'}
      </button>
      <p>State: {isOn ? 'ON' : 'OFF'}</p>
    </div>
  );
}