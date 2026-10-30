import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);

    const handleLogoutEvent = () => {
      setUser(null);
    };

    window.addEventListener('auth-logout', handleLogoutEvent);

    return () => {
      window.removeEventListener('auth-logout', handleLogoutEvent);
    };
  }, []);

  // Login
  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
      });

      const { token, email } = response.data;

      const userData = {
        username,
        email,
      };

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setUser(userData);

      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.response?.data ||
          'Invalid username or password',
      };
    }
  };

  // Signup
  const signup = async (username, email, password) => {
    try {
      const response = await api.post('/auth/signup', {
        username,
        email,
        password,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message ||
          err.response?.data ||
          'Registration failed',
      };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);