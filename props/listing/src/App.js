import React from "react";
import Listing from "./components/Listing";
import items from "./assets/json/etsy.json"
import "./App.css";


function App() {
  return (
    <div className="container">
      <Listing items={items} />
    </div>
  );
}

export default App;
