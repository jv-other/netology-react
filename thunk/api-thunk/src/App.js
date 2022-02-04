import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import ServicesList from "./components/ServicesList";
import ServicesForm from "./components/ServicesForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container mt-5" style={{ width: "50rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/services" />} />
          <Route path="/services" element={<ServicesList />} />
          <Route path="/services/:id" element={<ServicesForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
