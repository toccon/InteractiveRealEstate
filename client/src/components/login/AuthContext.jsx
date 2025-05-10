// src/contexts/AuthContext.jsx
import React, { createContext, useContext } from 'react';
import { useAuth as useOidcAuth } from 'react-oidc-context';

const AuthContext = createContext();

export const AuthProviderWrapper = ({ children }) => {
  const oidc = useOidcAuth();

  const { isAuthenticated, user, signinRedirect, signoutRedirect, isLoading } = oidc;

  const login = signinRedirect;
  const logout = signoutRedirect;
  const currentUser = user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);