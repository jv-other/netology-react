import React from "react";
import Watches from "./components/Watches/Watches";

import "./App.css";

const watches = [{
  name: "London",
  timezoneOffset: 0
}, {
  name: "Moscow",
  timezoneOffset: -3
}];

function App() {
  return (
    <div className="container">
      <Watches watches={watches} />
    </div>
  );
}

export default App;
