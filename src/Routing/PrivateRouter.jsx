import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <span className='loading loading-spinner'></span>;
    }

    if(!user){
  return <Navigate to="/login" state={location.pathname} />;
    
    }
    return children;
};

export default PrivateRouter