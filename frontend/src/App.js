import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Alerts from "./components/Alerts";
import Goals from "./components/Goals";
import Login from "./components/Login";
import "./App.css";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [latestData, setLatestData] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App">
      <h1>Smart Home Savings</h1>
      <p>Welcome, {user.username}</p>
      <Dashboard setLatestData={setLatestData} />
      <Alerts data={latestData} />
      <Goals initialGoals={user.goals} />
    </div>
  );
}

export default App;
