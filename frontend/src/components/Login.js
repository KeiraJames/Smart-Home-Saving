import React, { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5001";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState(false);
  const [goals, setGoals] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = newUser ? `${API_BASE}/signup` : `${API_BASE}/login`;
      const payload = newUser
        ? { username, password, goals: goals.split(",").map(g => g.trim()) }
        : { username, password };

      const res = await axios.post(url, payload);
      const { token, goals: userGoals } = res.data;
      localStorage.setItem("token", token);
      onLogin({ username, goals: userGoals });
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>{newUser ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {newUser && (
          <input placeholder="Enter your energy/financial goals separated by commas" value={goals} onChange={e => setGoals(e.target.value)} />
        )}
        <button type="submit">{newUser ? "Sign Up" : "Login"}</button>
      </form>
      <p style={{ marginTop: "10px", cursor: "pointer", color: "#4f46e5" }} onClick={() => setNewUser(!newUser)}>
        {newUser ? "Already have an account? Login" : "New user? Sign Up"}
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
