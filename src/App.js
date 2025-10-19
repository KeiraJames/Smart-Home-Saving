import React, { useState } from 'react';

// Import all necessary components for the entire application flow
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import OnboardingMonitor from './components/OnboardingMonitor';
import OnboardingPlacement from './components/OnboardingPlacement';
import Dashboard from './components/Dashboard';
import CostSummaryPage from './components/CostSummaryPage';
import UpdateGoalsPage from './components/UpdateGoalsPage';
import ChatbotPage from './components/ChatbotPage'; // Added Chatbot component

import './App.css'; 

function App() {
  // State for tracking the logged-in user (null if logged out)
  const [user, setUser] = useState(null); 
  
  // State for the pre-login flow (e.g., 'landing', 'login')
  const [view, setView] = useState('landing');
  
  // State for navigation after the user is logged in (e.g., 'dashboard', 'Usage Chart')
  const [activePage, setActivePage] = useState('dashboard');
  
  // State to hold the user's financial goal, with a default value
  const [savingsGoal, setSavingsGoal] = useState(100.00);

  // --- Event Handlers for State Transitions ---
 
  const handleLoginSuccess = () => {
    setUser({ name: 'K' });
    setActivePage('dashboard'); // Ensure we start at the dashboard on login
  };

  const handleSignUpSuccess = () => {
    setView('onboarding-monitor');
  };

  const handleOnboardingNext = (data) => {
    console.log('User Onboarding Data:', data);
    setView('onboarding-placement');
  };

  const handleOnboardingComplete = () => {
    setUser({ name: 'K' });
    setActivePage('dashboard'); // Also start at dashboard after onboarding
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing'); // Reset to the very beginning of the flow
  };

  // --- Render Logic ---
  
  // This function determines which component to render AFTER the user is logged in.
  const renderLoggedInContent = () => {
    switch(activePage) {
      case 'Usage Chart':
        // Render the CostSummaryPage, passing the current savingsGoal down as a prop.
        return <CostSummaryPage 
                  userSavingsGoal={savingsGoal} 
                  onBack={() => setActivePage('dashboard')} 
                />;
      
      case 'Update Goals':
        // Render the UpdateGoalsPage, passing the current goal and the function to update it.
        return <UpdateGoalsPage 
                  currentGoal={savingsGoal} 
                  onBack={() => setActivePage('dashboard')} 
                  onSaveGoal={setSavingsGoal} 
                />;

      case 'EcoVolt Chatbot':
        // Render the new ChatbotPage.
        return <ChatbotPage onBack={() => setActivePage('dashboard')} />;
      
      case 'dashboard':
      default:
        // By default, show the main dashboard.
        // Pass the setActivePage function to the dashboard for navigation.
        return <Dashboard onLogout={handleLogout} onNavigate={setActivePage} />;
    }
  }

  // This function determines which component to render BEFORE the user is logged in.
  const renderLoggedOutContent = () => {
    switch (view) {
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} onSwitchToSignUp={() => setView('signup')} onBack={() => setView('landing')} />;
      case 'signup':
        return <SignUp onSignUpSuccess={handleSignUpSuccess} onSwitchToLogin={() => setView('login')} onBack={() => setView('landing')} />;
      case 'onboarding-monitor':
        return <OnboardingMonitor onNext={handleOnboardingNext} onBack={() => setView('signup')} />;
      case 'onboarding-placement':
        return <OnboardingPlacement onComplete={handleOnboardingComplete} />;
      case 'landing':
      default:
        return <LandingPage onNavigate={() => setView('login')} />;
    }
  };

  return (
    <div 
      className="app-container" 
      data-logged-in={!!user} // This attribute controls the background image transition
    >
      <div className="phone-container">
        {/* 
          If a user object exists, render the logged-in content (dashboard, chatbot, etc.).
          Otherwise, render the logged-out content (landing, login, etc.).
        */}
        {user ? renderLoggedInContent() : renderLoggedOutContent()}
      </div>
    </div>
  );
}

export default App;