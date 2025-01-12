import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Component/auth/Login";
import Register from "./Component/auth/Register";
import OTP from "./Component/auth/OTP";
import Dashboard from "./Component/Dashboard";
import Sidebar from "./Component/Shared/Sidebar";
import TopNavbar from "./Component/Shared/TopNavbar";
import "./App.css";
import Pages from "./Component/Pages";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {isAuthenticated && <TopNavbar />}
      <div className="app-container">
        {isAuthenticated && <Sidebar />}
        <div className="main-content">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
              }
            />
            <Route
              path="/otp"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <OTP />}
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/pages"
              element={isAuthenticated ? <Pages /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
