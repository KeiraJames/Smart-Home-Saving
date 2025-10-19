import React from 'react';


const Dashboard = ({ onLogout, onNavigate }) => {

  // Since this is a static UI, we define placeholder values directly.
  const userName = "K";
  const displayTemp = '72°F';
  const displayHumidity = '45%';

  

  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        {/* An empty div to push the logout button to the far right */}
        <div></div> 
        <button onClick={onLogout} className="logout-button">Logout</button>
      </header>

      <main className="dashboard-content">
        <div className="welcome-message">
          <h1>Hi {userName}</h1>
          <p>Welcome to your smart home</p>
        </div>

        <div className="widget weather-widget">
          <div className="weather-item">
            <span className="weather-icon-emoji">☀️</span>
            {/* Display the static placeholder data */}
            <span>{displayTemp}</span>
          </div>
          <div className="separator"></div>
          <div className="weather-item">
            {/* Display the static placeholder data */}
            <span>{displayHumidity}</span>
            <small>Humidity</small>
          </div>
        </div>

        <div className="rooms-section">
          <h2>Select an Option</h2>
          <div className="rooms-carousel">
            {/* 
              Each card, when clicked, calls the onNavigate function passed down from App.js,
              telling it which page to navigate to.
            */}
            <div className="room-card" onClick={() => onNavigate('Usage Chart')}>
              <div className="card-content"><h3>Usage Chart</h3></div>
            </div>
            <div className="room-card" onClick={() => onNavigate('Update Goals')}>
               <div className="card-content"><h3>Update Goals</h3></div>
            </div>
            <div className="room-card" onClick={() => onNavigate('EcoVolt Chatbot')}>
               <div className="card-content"><h3>Chatbot</h3></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="dashboard-footer">
        <div className="footer-indicator"></div>
      </footer>
    </div>
  );
};

export default Dashboard;
