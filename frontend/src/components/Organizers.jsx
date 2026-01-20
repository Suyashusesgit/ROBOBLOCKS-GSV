import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 8rem 2rem;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid var(--color-border);
`;

const Title = styled.h2`
  font-size: 3rem;
  margin-bottom: 4rem;
  text-align: center;
  color: #fff;
`;

const OrganizersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
`;

const OrganizerCard = styled(motion.div)`
  text-align: center;
`;

const ImagePlaceholder = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, #222, #333);
  margin: 0 auto 1.5rem;
  border: 2px solid var(--color-primary);
  overflow: hidden;
  position: relative;

  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    box-shadow: none;
  }
`;

const Name = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const Role = styled.p`
  color: var(--color-primary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`;

const Contact = styled.p`
  color: #aaa;
  font-size: 0.9rem;
`;

const Organizers = ({ data }) => {
  const team = data || [
    { name: "Alex Chen", role: "Event Lead", contact: "alex@roboblocks.com" },
    { name: "Sarah Jones", role: "Technical Head", contact: "sarah@roboblocks.com" },
    { name: "Mike Ross", role: "Operations", contact: "mike@roboblocks.com" }
  ];

  return (
    <Section>
      <Title>Organizing Team</Title>
      <OrganizersGrid>
        {team.map((member, index) => (
          <OrganizerCard
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <ImagePlaceholder />
            <Name>{member.name}</Name>
            <Role>{member.role}</Role>
            <Contact>{member.contact}</Contact>
          </OrganizerCard>
        ))}
      </OrganizersGrid>
    </Section>
  );
};

export default Organizers;
