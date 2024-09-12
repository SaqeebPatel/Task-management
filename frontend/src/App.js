import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import SignInPage from "./components/SignInPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
