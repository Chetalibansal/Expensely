import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../services/authService';

const SignupForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { token, user } = await signupUser(name, email, password);

      localStorage.setItem('authToken', token);
      localStorage.setItem('userEmail', user.email);
      navigate('/dashboard');
    } catch (err) {
      alert(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full px-4 py-2 border rounded-md"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
      >
        {loading ? 'Signing up...' : 'Signup'}
      </button>
    </form>
  );
};

export default SignupForm;
