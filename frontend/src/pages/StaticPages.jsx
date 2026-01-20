import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import TextReveal from '../components/TextReveal';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 800px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  margin-bottom: 3rem;
  text-align: center;
  text-shadow: 0 0 20px var(--color-primary);
`;

const TextBlock = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #ccc;
  margin-bottom: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled(motion.li)`
  padding: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  color: #ccc;
  
  &:last-child { border-bottom: none; }
  
  strong { color: var(--color-primary); }
`;

export const About = () => (
    <PageContainer>
        <TextReveal>
            <Title>mission_briefing</Title>
        </TextReveal>
        <ContentWrapper
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <GlassCard>
                <TextBlock>
                    **RoboBlocks** is the premier national-level robotics event designed to test the limits of mechanical engineering and autonomous code.
                </TextBlock>
                <TextBlock>
                    Set in the year 2140, teams must engineer units capable of navigating the "CyberGrid"—a hazardous digital-physical terrain. Only the most efficient algorithms and robust hardware will survive the gauntlet.
                </TextBlock>
                <TextBlock>
                    Join us in the arena. Prove your logic.
                </TextBlock>
            </GlassCard>
        </ContentWrapper>
    </PageContainer>
);

export const Rules = () => {
    const rules = [
        "Squad Size: Max 4 Operators per unit.",
        "Dimensions: Robot must fit within a 30x30x30cm bounding box.",
        "Weight Limit: Wired units < 5kg, Autonomous units < 4kg.",
        "Power: On-board DC sources only. No combustion engines.",
        "Conduct: Sabotage of enemy signals (jamming) is strictly prohibited.",
        "Safety: Emergency kill-switch must be accessible at all times."
    ];

    return (
        <PageContainer>
            <TextReveal>
                <Title>protocols</Title>
            </TextReveal>
            <ContentWrapper
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <GlassCard>
                    <List>
                        {rules.map((rule, i) => (
                            <ListItem
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <strong>0{i + 1} //</strong> {rule}
                            </ListItem>
                        ))}
                    </List>
                </GlassCard>
            </ContentWrapper>
        </PageContainer>
    );
};

export const Teams = () => (
    <PageContainer>
        <TextReveal>
            <Title>active_units</Title>
        </TextReveal>
        <ContentWrapper>
            <GlassCard style={{ textAlign: 'center', padding: '4rem' }}>
                <h3 style={{ color: 'var(--color-secondary)' }}>DATABASE LOCKED</h3>
                <p style={{ marginTop: '1rem' }}>Team roster will be declassified after Registration Phase 1 ends.</p>
            </GlassCard>
        </ContentWrapper>
    </PageContainer>
);
