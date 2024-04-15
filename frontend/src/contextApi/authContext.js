import React, { createContext, useContext, useReducer, useState } from 'react';
import axios from 'axios'
import { Navigate  } from 'react-router-dom';
import {  toast } from "react-toastify";
// Create Context Object
export const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};
// Create a provider for components to consume and subscribe to changes
export const AuthProvider = ({ children }) => {
  const initialState = {
    user: null // user object includes roles and permissions
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (username,password) => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/users/login', {username,password});
      if (data.user) {
        dispatch({ type: 'LOGIN', payload: data.user });
        toast.success('Login successful');
      } else {
        toast.error('Login failed: No user data returned');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(`Login failed: ${error.response ? error.response.data.message : 'Server error'}`);
    }
  };
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast.info('Logged out successfully'); // Optional: Notify user of successful logout
  };

  const value = { ...state, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => useContext(AuthContext);
