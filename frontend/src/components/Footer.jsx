import React from 'react';
import styled from 'styled-components';

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
  margin-top: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const SocialLink = styled.a`
  color: var(--color-text);
  font-size: 1.2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <SocialLinks>
                <SocialLink href="#">Instagram</SocialLink>
                <SocialLink href="#">Twitter</SocialLink>
                <SocialLink href="#">LinkedIn</SocialLink>
            </SocialLinks>
            <FooterText>&copy; {new Date().getFullYear()} RoboBlocks. All rights reserved.</FooterText>
        </FooterContainer>
    );
};

export default Footer;
