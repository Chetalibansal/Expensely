import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/auth" />;
  return children;
};

export default ProtectedRoute;
