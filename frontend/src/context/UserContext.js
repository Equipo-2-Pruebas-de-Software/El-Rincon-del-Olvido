// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userAdmin, setUserAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Nueva propiedad

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (user && token) {
      setUserName(user.name);
      setUserAdmin(user.isAdmin || false);
      setIsAuthenticated(true);
    }
  }, []);

  const updateUser = (user) => {
    setUserName(user.name);
    setUserAdmin(user.isAdmin);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserName(null);
    setUserAdmin(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ userName, userAdmin, isAuthenticated, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
