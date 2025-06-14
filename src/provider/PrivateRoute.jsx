import React, { useContext, useEffect } from 'react';
import { AuthContext } from './AuthProvider';
import Loading from '../Pages/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading, setIsAuthModalOpen } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user?.email) {
      setIsAuthModalOpen(true);
    }
  }, [user, loading, setIsAuthModalOpen]);

  if (loading) return <Loading></Loading>; 

  if (user?.email) return children;

  return null;
};

export default PrivateRoute;