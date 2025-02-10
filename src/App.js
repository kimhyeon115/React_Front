import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import JoyOrderDashboardTemplate from "./Dashboard";
import ProtectedRoute from "./route/ProtectedRout";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<div className="login-page"><Login /></div>} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <div className="dashboard-page">
                  <JoyOrderDashboardTemplate />
                </div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;