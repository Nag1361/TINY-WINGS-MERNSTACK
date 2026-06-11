import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GiButterfly } from 'react-icons/gi';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <GiButterfly  className="logo-icon" />
          <span>Tiny Wings</span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/healthcare" onClick={() => setMenuOpen(false)}>Healthcare</Link>
          <Link to="/parenting" onClick={() => setMenuOpen(false)}>Parenting</Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/community" onClick={() => setMenuOpen(false)}>Community</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="nav-link-btn">
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="nav-link-btn admin">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="nav-logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="nav-link-btn">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="nav-link-btn primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
