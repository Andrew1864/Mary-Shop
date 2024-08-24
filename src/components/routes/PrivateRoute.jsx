import React from "react";
import { Navigate } from "react-router";
import { AuthProvider, useAuth } from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
const { user, loading } = useAuth();

if (loading) {
    return <div>...loading</div>;
}
    return user?.role === 'admin' ? children : <Navigate to="/" />
};

export default AdminRoute;