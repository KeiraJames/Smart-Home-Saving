import React, { useState } from 'react';

const OnboardingMonitor = ({ onNext, onBack }) => {
  const [monitoring, setMonitoring] = useState({ temp: false, humidity: false });
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setMonitoring(prev => ({ ...prev, [name]: checked }));
  };

  const handleNextClick = () => {
    // In a real app, you'd collect the cost data here too
    onNext(monitoring);
  }

  return (
    <div className="page-wrapper auth-wrapper onboarding">
      <button onClick={onBack} className="back-button">&lt; Back</button>
      
      <div className="chat-bubble">
        <p>First, what do you want to monitor to save on costs?</p>
      </div>
      
      <div className="onboarding-form">
        <label className="checkbox-container">
          <input type="checkbox" name="temp" checked={monitoring.temp} onChange={handleCheckboxChange} />
          <span className="checkmark"></span>
          Temperature
        </label>
        <label className="checkbox-container">
          <input type="checkbox" name="humidity" checked={monitoring.humidity} onChange={handleCheckboxChange} />
          <span className="checkmark"></span>
          Humidity
        </label>

        <input type="number" placeholder="Current monthly spending ($)" className="auth-input" />
        <input type="number" placeholder="Ideal monthly spending ($)" className="auth-input" />
        
        <button onClick={handleNextClick} className="cta-button">Next</button>
      </div>
    </div>
  );
};

export default OnboardingMonitor;