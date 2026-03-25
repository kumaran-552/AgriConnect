import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🌾 AgriConnect
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link
            to="/agriculture"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Agriculture
          </Link>
          <Link
            to="/insurance"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Insurance
          </Link>
          <Link
            to="/poultry"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Poultry
          </Link>
          <Link
            to="/products"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/livestock"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Livestock
          </Link>
          <Link
            to="/experts"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Experts
          </Link>
          <Link
            to="/doctors"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Doctors
          </Link>

          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="nav-link register-btn"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
