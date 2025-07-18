// src/pages/auth/LoginForm.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔍 Debug log
    console.log("Sending form data:", formData);

    try {
      const res = await loginUser(formData); // no token expected
      console.log("Login response:", res);

      if (res.success) {
        toast.success(res.message || "Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
