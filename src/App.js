import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import JoyOrderDashboardTemplate from "./Dashboard";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<div className="login-page"><Login /></div>} />
          <Route path="/dashboard" element={<div className="dashboard-page"><JoyOrderDashboardTemplate /></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;