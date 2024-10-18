import React, { useEffect, useState } from "react";
import './helloScreen.css'
import HomeAnimation from "../HomeAnimation/homeAnimation";

function HelloScreen() {
    const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the component after 8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Cleanup the timeout if the component unmounts before the timeout fires
    return () => clearTimeout(timer);
  }, []);
    
  return (
    <div className={`hello-screen-container ${!isVisible ? 'slide-out' : ''}`}>
      <HomeAnimation />
    </div>
  );
}

export default HelloScreen;
