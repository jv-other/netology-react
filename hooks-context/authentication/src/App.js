import React from 'react';

import AuthProvider from './components/AuthProvider';
import AuthContext from './components/AuthContext';

import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import Landing from './components/Landing';
import News from './components/News';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <AuthProvider>
      <nav className="navbar navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand mb-0 h1" href="#">Neto Social</a>
          <LoginForm />
          <Profile />
        </div>
      </nav>
      <AuthContext.Consumer>
        {value => (
          !value.token ? <Landing /> : <News />
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}
