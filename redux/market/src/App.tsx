import React from 'react';
import * as Product from './components/Product';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Product.Form />
      <br />
      <Product.List />
    </div>
  );
}

export default App;
