// components/Dashboard.js
import React, { useState, useEffect } from "react";
import { getLatestReading, getWaterUsage, getAverageTemperature } from "../api"; // We'll add new API calls

function Dashboard({ setLatestData }) {
  const [electricityReading, setElectricityReading] = useState(null);
  const [waterUsage, setWaterUsage] = useState(null);
  const [averageTemp, setAverageTemp] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Today"); // For filter buttons

  useEffect(() => {
    const fetchData = async () => {
      // Fetch electricity data
      const electricity = await getLatestReading();
      if (electricity) {
        setElectricityReading(electricity);
        setLatestData(electricity); // Pass to App.js
      }

      // Fetch water usage
      const water = await getWaterUsage();
      if (water) {
        setWaterUsage(water);
      }

      // Fetch average temperature
      const temp = await getAverageTemperature();
      if (temp) {
        setAverageTemp(temp);
      }
    };

    fetchData();
  }, [setLatestData]);

  return (
    <div className="dashboard">
      <h2>Your Smart Home Overview</h2>

      <div className="search-container">
        <input type="text" placeholder="Search data or timeframe..." />
        <button>Search</button>
      </div>

      <div className="filter-buttons-container">
        {["Today", "This Week", "This Month", "All Data"].map((filter) => (
          <button
            key={filter}
            className={`filter-button ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="quick-view-section">
        {/* Main Electricity Reading Card */}
        <div className="main-reading-card">
          <div>
            <h3>Latest Electricity Reading</h3>
            {electricityReading ? (
              <>
                <p className="value">{electricityReading.value}</p>
                <p className="unit">{electricityReading.unit}</p>
                <p className="date">
                  {new Date(electricityReading.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <button>View Details</button>
        </div>

        {/* Side Data Cards */}
        <div className="side-data-cards">
          <div className="side-card">
            <span className="icon-placeholder">💧</span> {/* Water drop icon */}
            <div>
              <p className="label">Daily Water Usage</p>
              {waterUsage ? (
                <p className="value">{waterUsage.value} {waterUsage.unit}</p>
              ) : (
                <p>-- L</p>
              )}
            </div>
          </div>

          <div className="side-card">
            <span className="icon-placeholder">☀️</span> {/* Sun icon */}
            <div>
              <p className="label">Average Temperature</p>
              {averageTemp ? (
                <p className="value">{averageTemp.value} {averageTemp.unit}</p>
              ) : (
                <p>-- °C</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;