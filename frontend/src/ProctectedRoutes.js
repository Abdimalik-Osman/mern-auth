import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contextApi/authContext';

const ProtectedRoute = ({ children, pageId }) => {
    const { user } = useAuth();
    let location = useLocation();

    if (!user) {
        // User is not logged in
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!user.accessiblePages.includes(pageId)) {
        // User does not have access to this page
        return <Navigate to="/unauthorized" replace />;
    }

    return children; // User is authenticated and has access
};

export default ProtectedRoute;
