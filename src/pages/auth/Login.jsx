import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.email === email && user.password === password) {
      localStorage.setItem('user', JSON.stringify(user));
      setError('');
      navigate('/student-dashboard');
      window.location.reload();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${theme}`}
      style={{ background: theme === 'dark' ? 'radial-gradient(circle at top left, #0f2027, #203a43, #2c5364)' : 'linear-gradient(90deg,#e0eafc,#cfdef3)' }}>
      <div className="col-12 col-md-8 col-lg-6">
        <div className="glass-card p-4">
          <h3 className="text-center mb-4">Welcome Back</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">Email address</label>
              <input type="email" className="form-control" id="loginEmail" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" required />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="loginPassword" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            {error && <div className="alert alert-danger py-1">{error}</div>}
            <div className="d-grid">
              <button type="submit" className="btn btn-neon">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
