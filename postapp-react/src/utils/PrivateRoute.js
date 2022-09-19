import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const loggedIn = localStorage.getItem("jwtToken") === null ? false : true
    return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute