
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ShieldCheck,
  LockKeyhole,
  ArrowRight,
  Eye,
  EyeOff
} from 'lucide-react';

import api from '../../services/api';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!password.trim()) {
      alert('Please enter your admin key.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/admin/login', {
        password
      });

      if (response.data.success) {
        localStorage.setItem(
          'zewd_admin_token',
          response.data.token
        );

        localStorage.setItem(
          'zewd_admin_user',
          JSON.stringify(response.data.admin)
        );

        alert('Login successful! Welcome to Zewd Sportwear Admin.');

        navigate('/admin');
      } else {
        alert(response.data.message || 'Login failed. Please try again.');
      }

    } catch (err) {
      alert(
        err.response?.data?.message ||
        'Invalid admin key. Please try again.'
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">

      <div className="admin-login-background">
        <div className="login-glow login-glow-one"></div>
        <div className="login-glow login-glow-two"></div>
      </div>

      <div className="admin-login-card">

        <div className="admin-login-logo">
          <div className="admin-logo-icon">
            <ShieldCheck size={30} />
          </div>

          <span>ZEWD</span>
          <span className="logo-red">SPORTWEAR</span>
        </div>

        <div className="admin-login-header">
          <span className="admin-login-eyebrow">
            ADMINISTRATION PORTAL
          </span>

          <h1>
            Welcome <span>Back.</span>
          </h1>

          <p>
            Sign in to manage your sportswear store,
            products and orders.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="admin-login-form"
        >

          <div className="admin-form-group">
            <label htmlFor="admin-password">
              ADMIN KEY
            </label>

            <div className="admin-input-wrapper">
              <LockKeyhole size={19} />

              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your secret admin key"
                required
                autoFocus
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>
          </div>

          <button
            type="submit"
            className="admin-primary-btn"
            disabled={loading}
          >
            <span>
              {loading ? 'Verifying...' : 'Unlock Dashboard'}
            </span>

            {!loading && <ArrowRight size={19} />}
          </button>

        </form>

        <div className="admin-login-security">
          <ShieldCheck size={16} />
          <span>Secure Administrator Access</span>
        </div>

        <div className="admin-login-footer">
          <p>
            © {new Date().getFullYear()} ZEWD SPORTWEAR.
            ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;
