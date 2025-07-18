import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/users/profile", {
          withCredentials: true
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (isAuthenticated === false) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
