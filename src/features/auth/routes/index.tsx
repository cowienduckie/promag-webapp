import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { useUser } from '@/lib/auth';

import { Login } from './Login';
import { Register } from './Register';

export const AuthRoutes = () => {
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (user.data) {
      navigate('/app');
    }
  }, [navigate, user]);

  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};
