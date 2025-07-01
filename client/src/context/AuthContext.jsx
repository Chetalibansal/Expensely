import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
  // Temporary mock login
  const dummyToken = "mock-token";
  const dummyUser = { name: "VENOM", email };

  localStorage.setItem("token", dummyToken);
  setUser(dummyUser);
};


const signup = async (name, email, password) => {
  const res = await axios.post('/api/auth/signup', { name, email, password });
  localStorage.setItem('token', res.data.token);
  setUser(res.data.user);
};

const logout = () => {
  localStorage.removeItem('token');
  setUser(null);
};


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setUser(res.data.user);
      }).catch(() => logout());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
