import React, { useState } from 'react';

import List from './components/List';
import Details from './components/Details';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <List
            selectedUser={selectedUser}
            onSelect={user => setSelectedUser(user)}
            dataUrl={process.env.REACT_APP_SERVER_URL}
          />
        </div>
        <div className="col">
          {selectedUser && (
            <Details
              info={selectedUser}
              dataUrl={process.env.REACT_APP_SERVER_URL}
            />
          )}
        </div>
      </div>
    </div>
  );
}
