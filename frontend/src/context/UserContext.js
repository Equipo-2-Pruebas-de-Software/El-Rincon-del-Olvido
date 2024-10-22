// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  const updateUserName = (name) => {
    setUserName(name);
    localStorage.setItem('user', JSON.stringify({ name })); // Guarda en localStorage también
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUserName(null);
  };

  return (
    <UserContext.Provider value={{ userName, updateUserName, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
