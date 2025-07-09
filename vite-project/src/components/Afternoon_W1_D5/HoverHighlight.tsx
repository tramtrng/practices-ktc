import { useState } from 'react';

export default function HoverHighlight() {
  const [backgroundColor, setBackgroundColor] = useState<string>('white');

  const handleMouseEnter = (): void => {
    setBackgroundColor('yellow');
  };

  const handleMouseLeave = (): void => {
    setBackgroundColor('white');
  };

  return (
    <div
      style={{ backgroundColor, padding: '20px', width: 'fit-content' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Hover me!
    </div>
  );
}