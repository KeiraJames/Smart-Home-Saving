import React from "react";

const Alerts = ({ data }) => {
  if (!data) return null;

  const alerts = [];
  if (data.energy_cost > 0) alerts.push("High heating cost detected!");
  if (data.mold_risk > 0) alerts.push("High humidity — possible mold risk!");

  return (
    <div className="alerts">
      <h3>Alerts</h3>
      {alerts.length === 0 ? (
        <p>No alerts</p>
      ) : (
        <ul>
          {alerts.map((alert, i) => (
            <li key={i}>{alert}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alerts;
