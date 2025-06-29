/* eslint-disable react-refresh/only-export-components */

import React, { createContext, useState, useContext } from 'react';

// Create context
const AuthContext = createContext();

// Provider component
export function AuthProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // This function will be called when admin successfully logs in
  const loginAdmin = () => setIsAdminLoggedIn(true);

  // Call this to logout admin
  const logoutAdmin = () => setIsAdminLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  return useContext(AuthContext);
}
