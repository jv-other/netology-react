import React from "react";
import DemoComponent from "./components/DemoComponent";

import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col"><DemoComponent resource="data" /></div>
        <div className="col"><DemoComponent resource="error" /></div>
        <div className="col"><DemoComponent resource="loading" /></div>
        {/* <div className="col"><DemoComponent resource="notFound" /></div> */}
      </div>
    </div>
  );
}
