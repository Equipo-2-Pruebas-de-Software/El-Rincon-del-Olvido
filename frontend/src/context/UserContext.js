// src/context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [userAdmin, setUserAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // /src/context/UserContext.js

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        const user = JSON.parse(storedUser);
        if (user) {
          setUserName(user.name);
          setUserAdmin(user.isAdmin || false); // Asegurarse de que isAdmin se obtiene del almacenamiento
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error al parsear el usuario:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);


  const updateUser = (user) => {
    setUserName(user.name);
    setUserAdmin(user.isAdmin); // Asegurarse de que se almacena isAdmin
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
