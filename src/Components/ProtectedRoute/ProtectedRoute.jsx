import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const localToken = localStorage.getItem("Token");
    if (localToken !== null) return children
    else return <Navigate to={"login"}></Navigate>
}

export default ProtectedRoute