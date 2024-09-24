import React from 'react';
import './css/LoadingScreenComponent.css'; 

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingScreen;
