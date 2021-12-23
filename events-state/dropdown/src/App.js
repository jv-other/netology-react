import React from "react";
import Dropdown from "./components/Dropdown";
import "./App.css";
import "./assets/css/main.css";

const items = ["Profile Information", "Change Password", "Become PRO", "Help", "Log Out"];

function App() {
  return (
    <div className="container">
      <Dropdown items={items} />
    </div>
  );
}

export default App;
