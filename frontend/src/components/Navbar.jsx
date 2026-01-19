import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    background: rgba(5, 5, 5, 0.8);
    backdrop-filter: blur(10px);
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

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

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
      <CTAButton to="/register">Register Team</CTAButton>
    </Nav>
  );
};

export default Navbar;
