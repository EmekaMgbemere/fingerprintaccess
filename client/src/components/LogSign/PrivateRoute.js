import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useEffect} from 'react';

const PrivateRoute = ({ childred, ...rest }) => {
  const isAuthenticated = localStorage.getItem('otpVerified');

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('otpVerified');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); 


  return (
    isAuthenticated ? <Outlet /> : <Navigate to='/logincar' />
  );
};

export default PrivateRoute;