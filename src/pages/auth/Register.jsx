import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '', age: '', grade: '', institute: '', address: '', marks: '', email: '', password: '', confirm: ''
  });
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    if (!form.name || !form.email || !form.password) {
      setError('Please fill all required fields');
      return;
    }
    localStorage.setItem('user', JSON.stringify({
      name: form.name,
      age: form.age,
      grade: form.grade,
      institute: form.institute,
      address: form.address,
      marks: form.marks,
      email: form.email,
      password: form.password
    }));
    setError('');
    navigate('/auth/login');
  };

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${theme}`}
      style={{ background: theme === 'dark' ? 'radial-gradient(circle at top left, #0f2027, #203a43, #2c5364)' : 'linear-gradient(90deg,#e0eafc,#cfdef3)' }}>
      <div className="col-12 col-md-8 col-lg-6">
        <div className="glass-card p-4">
          <h3 className="text-center mb-4">Create Your Account</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
            </div>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="number" className="form-control" id="age" min="10" max="30" value={form.age} onChange={handleChange} placeholder="e.g. 16" />
              </div>
              <div className="mb-3 col-md-6">
                <label htmlFor="grade" className="form-label">Class / Grade</label>
                <select className="form-select" id="grade" value={form.grade} onChange={handleChange}>
                  <option value="">Choose...</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="institute" className="form-label">Institute Name</label>
              <input type="text" className="form-control" id="institute" value={form.institute} onChange={handleChange} placeholder="School/College Name" />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Institute Address</label>
              <textarea className="form-control" id="address" rows="2" value={form.address} onChange={handleChange} placeholder="Full address"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="marks" className="form-label">Marks / Percentage</label>
              <input type="text" className="form-control" id="marks" value={form.marks} onChange={handleChange} placeholder="e.g. 85%" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" value={form.email} onChange={handleChange} placeholder="name@example.com" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={form.password} onChange={handleChange} placeholder="••••••••" required />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirm" value={form.confirm} onChange={handleChange} placeholder="••••••••" required />
            </div>
            {error && <div className="alert alert-danger py-1">{error}</div>}
            <div className="d-grid">
              <button type="submit" className="btn btn-neon">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
