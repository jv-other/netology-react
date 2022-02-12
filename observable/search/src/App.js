import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import Search from "./components/Search";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <div className="row mt-3 justify-content-center">
          <div className="col-6">
            <Search />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
