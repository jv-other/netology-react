import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthProvider from './components/AuthProvider';
import AuthContext from './components/AuthContext';

import LoginForm from './components/LoginForm';
import Profile from './components/Profile';

import LandingPage from './pages/LandingPage';
import NewsPage from './pages/NewsPage';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NewItemPage from './pages/NewItemPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <nav className="navbar navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand mb-0 h1" href="#">Neto Social</a>
            <AuthContext.Consumer>
              {value => (!value.token ? <LoginForm /> : <Profile />)}
            </AuthContext.Consumer>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewItemPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router >
  );
};
