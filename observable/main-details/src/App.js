import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";

import ServicesList from "./components/ServicesList";
import ServicesForm from "./components/ServicesForm";


import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <div className="row mt-3 justify-content-center">
            <div className="col-6">
              <Routes>
                <Route path="/" element={<ServicesList />} />
                <Route path="/:id/details" element={<ServicesForm />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
