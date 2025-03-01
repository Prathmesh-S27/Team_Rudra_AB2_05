import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from "./../../assets/navbarLogo.png";
import logo1 from "./../../assets/circle-user.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close menu when clicking outside
  useEffect(() => {
    if (menuOpen) {
      const closeMenu = () => setMenuOpen(false);
      document.addEventListener('click', closeMenu);
      return () => document.removeEventListener('click', closeMenu);
    }
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <Link to="/" className="logo">
        <img src={logo} alt="DriveCalc Logo" className="logo-image" />
      </Link>

      {/* Hamburger Menu */}
      <div 
        className="hamburger" 
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? '✕' : '☰'}
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><a href="#about" className="nav-link">About Us</a></li>
        <li><a href="#contact" className="nav-link">Contact Us</a></li>
        <li>
          <button className="loginButton">
            <img 
              src={logo1} 
              alt="User Icon" 
              style={{ height: "22px", width: "22px" }} 
              className='icon' 
            />
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;