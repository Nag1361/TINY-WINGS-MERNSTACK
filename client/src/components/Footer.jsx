import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="footer-content">
          <div className="footer-section">
            <h5>About Us</h5>
            <p>
              Tiny Wings is your comprehensive platform for baby growth tracking,
              parenting tips, healthcare information, and shopping for baby products.
            </p>
          </div>

          <div className="footer-section">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/healthcare">Healthcare</Link></li>
              <li><Link to="/parenting">Parenting</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h5>Categories</h5>
            <ul>
              <li><Link to="/shop?category=Baby Care">Baby Care</Link></li>
              <li><Link to="/shop?category=Clothing">Clothing</Link></li>
              <li><Link to="/shop?category=Toys">Toys</Link></li>
              <li><Link to="/shop?category=Feeding">Feeding</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h5>Follow Us</h5>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Tiny Wings. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
