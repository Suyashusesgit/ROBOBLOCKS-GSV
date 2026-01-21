import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background: transparent;
  transition: padding 0.3s ease;
  
  &.scrolled {
    background: #000;
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--color-border);
  }
`;

const Logo = styled(Link)`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: 0.1em;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none; /* Mobile menu implementation later */
  }
`;

const NavLink = styled(Link)`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const CTAButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background: var(--color-secondary);
  color: #fff;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  text-transform: uppercase;
  clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
  transition: transform 0.3s ease, background 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: #ff2a5d;
  }
`;



const CyberButton = styled(Link)`
  position: relative;
  padding: 0.8rem 2rem;
  background: transparent;
  color: #0ff;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid #0ff;
  overflow: hidden;
  transition: all 0.3s ease;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
    z-index: -1;
  }

  &:hover {
    color: #000;
    background: #0ff;
    box-shadow: 0 0 20px #0ff;
    
    &::before {
      left: 100%;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #0ff;
    border-right: 2px solid #0ff;
    transition: all 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    height: 100%;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--color-primary);
  font-size: 1.5rem;
  z-index: 101;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const MobileNavLink = styled(Link)`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <Nav className={isScrolled ? 'scrolled' : ''}>
      <Logo to="/">ROBOBLOCKS</Logo>

      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/teams">Teams</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/schedule">Schedule</NavLink>
        <NavLink to="/leaderboard">Leaderboard</NavLink>
        <NavLink to="/faq">FAQ</NavLink>
      </NavLinks>

      <div className="desktop-auth" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <style>{`@media (max-width: 768px) { .desktop-auth { display: none !important; } }`}</style>
        {currentUser ? (
          <>
            {currentUser.role === 'admin' && (
              <NavLink to="/admin" style={{ color: '#ff003c' }}>Admin</NavLink>
            )}
            <NavLink to="/dashboard">Dashboard</NavLink>
            <CTAButton as="button" onClick={handleLogout} style={{ border: 'none', cursor: 'pointer' }}>
              Logout
            </CTAButton>
          </>
        ) : (
          <>
            <CyberButton to="/login">Login</CyberButton>
            <CTAButton to="/register">Register Team</CTAButton>
          </>
        )}
      </div>

      <MobileMenuToggle onClick={toggleMenu}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </MobileMenuToggle>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenuOverlay
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
            <MobileNavLink to="/about" onClick={toggleMenu}>About</MobileNavLink>
            <MobileNavLink to="/teams" onClick={toggleMenu}>Teams</MobileNavLink>
            <MobileNavLink to="/gallery" onClick={toggleMenu}>Gallery</MobileNavLink>
            <MobileNavLink to="/schedule" onClick={toggleMenu}>Schedule</MobileNavLink>
            <MobileNavLink to="/leaderboard" onClick={toggleMenu}>Leaderboard</MobileNavLink>
            <MobileNavLink to="/faq" onClick={toggleMenu}>FAQ</MobileNavLink>

            {currentUser ? (
              <>
                {currentUser.role === 'admin' && (
                  <MobileNavLink to="/admin" onClick={toggleMenu} style={{ color: '#ff003c' }}>Admin</MobileNavLink>
                )}
                <MobileNavLink to="/dashboard" onClick={toggleMenu}>Dashboard</MobileNavLink>
                <MobileNavLink as="button" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  Logout
                </MobileNavLink>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" onClick={toggleMenu} style={{ color: '#0ff' }}>Login</MobileNavLink>
                <MobileNavLink to="/register" onClick={toggleMenu} style={{ color: 'var(--color-primary)' }}>Register Team</MobileNavLink>
              </>
            )}
          </MobileMenuOverlay>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;
