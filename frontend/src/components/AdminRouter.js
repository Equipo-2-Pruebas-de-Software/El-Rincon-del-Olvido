import { Outlet, Navigate } from 'react-router-dom';

const AdminRouter = () => {
    const { userInfo } = JSON.parse(localStorage.getItem('user').isAdmin);
    
    return userInfo  && userInfo.isAdmin 
        ? <Outlet /> 
    : <Navigate to='/login' replace />
}

export default AdminRouter;