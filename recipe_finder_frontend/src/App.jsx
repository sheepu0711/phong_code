import React from 'react';

import { Divider } from '@mantine/core';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import SideBar from './components/SideBar';

import AccountPage from './pages/AccountPage';
import CreateRecipePage from './pages/CreateRecipePage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import RecipePage from './pages/RecipePage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <SideBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/create-recipe" element={<CreateRecipePage />} />
        </Routes>
        <Divider my="xs" labelPosition="center" />
        <Footer />
      </div>
    </div>
  );
}

export default App;
