import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const Section = styled.section`
  padding: 8rem 2rem;
  // background: var(--color-bg); // Transparent for particles
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 4rem;
  text-align: center;
  color: #fff;
`;

const TierTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SponsorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 4rem;
`;

// Wrapper for TiltCard to handle layout/spacing
const StyledTiltCard = styled(TiltCard)`
  cursor: pointer;
`;

const SponsorCardContent = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  backdrop-filter: blur(5px);
  transition: border-color 0.3s ease;

  &:hover {
    border-color: var(--color-primary);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const SponsorLogo = styled.div`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: #aaa;
  font-weight: bold;
  transform: translateZ(20px);
`;

const Sponsors = () => {
  return (
    <Section>
      <Title>Our Sponsors</Title>

      <TierTitle>Title Sponsors</TierTitle>
      <SponsorsGrid>
        {[1, 2].map((i) => (
          <StyledTiltCard key={i}>
            <SponsorCardContent>
              <SponsorLogo>TECH GIANT {i}</SponsorLogo>
            </SponsorCardContent>
          </StyledTiltCard>
        ))}
      </SponsorsGrid>

      <TierTitle>Gold Sponsors</TierTitle>
      <SponsorsGrid>
        {[1, 2, 3].map((i) => (
          <StyledTiltCard key={i}>
            <SponsorCardContent>
              <SponsorLogo>INNOVATE {i}</SponsorLogo>
            </SponsorCardContent>
          </StyledTiltCard>
        ))}
      </SponsorsGrid>

      <TierTitle>Silver Sponsors</TierTitle>
      <SponsorsGrid>
        {[1, 2, 3, 4].map((i) => (
          <StyledTiltCard key={i}>
            <SponsorCardContent>
              <SponsorLogo>STARTUP {i}</SponsorLogo>
            </SponsorCardContent>
          </StyledTiltCard>
        ))}
      </SponsorsGrid>
    </Section>
  );
};

export default Sponsors;
