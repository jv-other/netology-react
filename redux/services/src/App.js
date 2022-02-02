import React from "react";

import * as Components from "./components";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App mt-3">
      <div className="row mb-3">
        <div className="col">
          <Components.WithStoreServiceForm />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <Components.ServiceFilter />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Components.WithStoreServiceList />
        </div>
      </div>
    </div>
  );
}

export default App; 
