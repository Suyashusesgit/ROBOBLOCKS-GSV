import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
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

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(0, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 255, 255, 0); }
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

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
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
  };

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

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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
    </Nav>
  );
};

export default Navbar;
