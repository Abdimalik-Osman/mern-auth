import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Home from './home';
import Login from './login';
import Dashboard from './dashboard';
import Reports from './reports';
import Unauthorized from './unAuthorized';
import { AuthProvider } from './contextApi/authContext';
import Navigation from './navigation';
import ProtectedRoute from './ProctectedRoutes';
import Settings from './settings';
import { ToastContainer } from 'react-toastify';
const App = () => {
    return (
        <AuthProvider>
                <ToastContainer />
            <BrowserRouter>
                <Navigation />
                <Container>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/unauthorized" element={<Unauthorized />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/dashboard" element={
                            <ProtectedRoute pageId="dashboard">
                                <Dashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/reports" element={
                            <ProtectedRoute pageId="reports">
                                <Reports />
                            </ProtectedRoute>
                        } />
                        <Route path="/settings" element={
                            <ProtectedRoute pageId="settings">
                                <Settings />
                            </ProtectedRoute>
                        } />
                        {/* Additional routes can be added here */}
                    </Routes>
                </Container>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
