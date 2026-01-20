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
  background: #111;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--color-primary);
    background: #1a1a1a;
    transform: translateY(-5px);
  }
`;

const SponsorLogo = styled.div`
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: #aaa;
  font-weight: bold;
  transform: translateZ(20px);
`;

const Sponsors = ({ data }) => {
  const sponsors = data || [
    { name: "TECH GIANT 1", tier: "Title" },
    { name: "TECH GIANT 2", tier: "Title" },
    { name: "INNOVATE 1", tier: "Gold" },
    { name: "INNOVATE 2", tier: "Gold" },
    { name: "INNOVATE 3", tier: "Gold" },
    { name: "STARTUP 1", tier: "Silver" },
  ];

  const renderTier = (tierName) => {
    return sponsors.filter(s => s.tier === tierName).map((s, i) => (
      <StyledTiltCard key={i}>
        <SponsorCardContent>
          <SponsorLogo>{s.name}</SponsorLogo>
        </SponsorCardContent>
      </StyledTiltCard>
    ));
  };

  return (
    <Section>
      <Title>Our Sponsors</Title>

      <TierTitle>Title Sponsors</TierTitle>
      <SponsorsGrid>
        {renderTier("Title")}
      </SponsorsGrid>

      <TierTitle>Gold Sponsors</TierTitle>
      <SponsorsGrid>
        {renderTier("Gold")}
      </SponsorsGrid>

      <TierTitle>Silver Sponsors</TierTitle>
      <SponsorsGrid>
        {renderTier("Silver")}
      </SponsorsGrid>
    </Section>
  );
};

export default Sponsors;
