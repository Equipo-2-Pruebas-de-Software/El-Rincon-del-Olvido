// /src/components/AdminRouter.js

import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const AdminRouter = () => {
  const { userAdmin, isAuthenticated } = useContext(UserContext);

  return isAuthenticated && userAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRouter;
