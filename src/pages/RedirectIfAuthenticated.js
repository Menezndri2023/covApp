// pages/RedirectIfAuthenticated.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';

const RedirectIfAuthenticated = ({ children }) => {
  const { user } = useAuth();

  // Si l'utilisateur est connecté, on le redirige vers /profil
  if (user) {
    return <Navigate to="/profil" replace />;
  }

  return children;
};

export default RedirectIfAuthenticated;
