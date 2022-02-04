import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginForm from './components/LoginForm';
import Profile from './components/Profile';

import LandingPage from './pages/LandingPage';
import NewsPage from './pages/NewsPage';
import NewsItemPage from './pages/NewsItemPage';
import NotFound from './pages/NotFound';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { tokenSelector } from './store';
import { useSelector } from 'react-redux';

export default function App() {
  const authToken = useSelector(tokenSelector);

  return (
    <Router>
      <nav className="navbar navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand mb-0 h1" href="#">Neto Social</a>
          {!authToken ? <LoginForm /> : <Profile />}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsItemPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router >
  );
};
