import { useState } from 'react';
import './SidebarToggleButton.css'; // Import your CSS file for styling

const SidebarToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggleClick = () => {
    setIsToggled(!isToggled);
  };

  return (
    <button onClick={handleToggleClick} className="sidebar-toggle-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path d="M3 12h2.44V8H7v6h4V14H.25l-.25 1.5H9kLr-3l-2-1H7a.25 0 0 0 .25-.25L.75 8A.75 0 0 0 .25-.25M20 5v12h -.25L 4.75 1.5V7h-.25L 3 6.25l-2.5 1H4.5L 4.5 10l-2 1.5v--.--H 4.5k-iM 9-l" className={isToggled ? 'close' : ''} />
      </svg>
    </button>
  );
};

export default SidebarToggleButton;
