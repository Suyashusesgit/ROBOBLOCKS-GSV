import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
  padding: 4rem 2rem;
  background: black;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const FooterText = styled.p`
  color: var(--color-text);
  opacity: 0.6;
  font-size: 0.9rem;
  margin-top: 2rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: var(--color-text);
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 15px var(--color-primary);
    border-color: var(--color-primary);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <SocialLinks>
        <SocialLink
          href="https://www.instagram.com/robotics.gsv/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          title="Robotics GSV Instagram"
        >
          <FaInstagram />
        </SocialLink>
        <SocialLink
          href="https://www.instagram.com/technocrats.gsv/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          title="Technocrats GSV Instagram"
        >
          <FaInstagram />
        </SocialLink>
        <SocialLink
          href="https://www.linkedin.com/company/technocrats-gsv/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          title="Technocrats GSV LinkedIn"
        >
          <FaLinkedin />
        </SocialLink>
      </SocialLinks>
      <FooterText>&copy; {new Date().getFullYear()} RoboBlocks. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
