import React from 'react';

// CORRECTED: Add onSignUpSuccess to the list of props here
const SignUp = ({ onSwitchToLogin, onBack, onSignUpSuccess }) => {
  return (
    <div className="page-wrapper auth-wrapper">
      <button onClick={onBack} className="back-button">&lt; Back</button>
      <div className="auth-container">
        <h2 className="auth-title">Create Account</h2>
        <form className="auth-form">
          <input type="text" placeholder="Full Name" className="auth-input" />
          <input type="email" placeholder="Email Address" className="auth-input" />
          <input type="password" placeholder="Password" className="auth-input" />
          {/* This button will now correctly call the function */}
          <button type="button" onClick={onSignUpSuccess} className="cta-button">Sign Up</button>
        </form>
        <p className="auth-switch-text">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="auth-switch-button">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;