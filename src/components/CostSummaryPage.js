import React from 'react';

// ... (The calculateCost function at the top is unchanged)
const calculateCost = (totalKwh) => { /* ... */ };

// --- The React Component ---
// UPDATED: The component now accepts `userSavingsGoal` as a prop.
const CostSummaryPage = ({ onBack, userSavingsGoal }) => {
  // --- SIMULATED DATA ---
  const totalKwhUsedSoFar = 310;
  // The userSavingsGoal now comes from props instead of being hardcoded.

  // Calculate the current cost using our function and the simulated data.
  const currentCost = calculateCost(totalKwhUsedSoFar);

  return (
    <div className="page-wrapper" style={{ justifyContent: 'flex-start', paddingTop: '80px', textAlign: 'center' }}>
      
      <h1 style={{ fontFamily: "'Lora', serif", fontSize: '2em', marginBottom: '40px' }}>
        Cost & Savings Summary
      </h1>

      <div className="summary-widget">
        <p className="widget-label">Monthly Savings Goal</p>
        {/* UPDATED: Display the goal passed in via props */}
        <p className="widget-value-large">${userSavingsGoal.toFixed(2)}</p>
      </div>
      
      <div className="summary-widget">
        <p className="widget-label">Estimated Cost So Far</p>
        <p className="widget-value-large" style={{ color: '#ff7300' }}>${currentCost}</p>
        <p className="widget-subtitle">Based on {totalKwhUsedSoFar} kWh used</p>
      </div>

      <button 
        className="logout-button" 
        style={{ marginTop: 'auto', marginBottom: '20px', alignSelf: 'center' }} 
        onClick={onBack}
      >
        Back to Dashboard
      </button>

    </div>
  );
};

export default CostSummaryPage;