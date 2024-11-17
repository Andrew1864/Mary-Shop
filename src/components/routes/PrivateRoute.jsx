import React from "react";
import { Navigate } from "react-router-dom";
import {  useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children ,requiredRole }) => {
const { user, loading } = useAuth();
console.log('PrivateRoute user:', user);

if (loading) {
    return <div>...loading</div>;
}
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" />;
    }
    return children;
};

export default PrivateRoute