import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import Tilt from 'react-parallax-tilt';

const PageContainer = styled.div`
  padding: 8rem 2rem;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
`;

const PodiumContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
  height: 400px;
  margin-bottom: 5rem;
  perspective: 1000px;
  
  @media (max-width: 768px) {
    transform: scale(0.8);
  }
`;

const PodiumStep = styled(motion.div)`
  width: 120px;
  background: #111;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 1rem;
  border-radius: 8px 8px 0 0;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  
  /* Dynamic Theme Gradients */
  background: ${props =>
    props.rank === 1 ? 'var(--podium-gold)' :
      props.rank === 2 ? 'var(--podium-silver)' :
        'var(--podium-bronze)'};

  border-color: var(--color-primary);
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #333;
  margin-bottom: 1rem;
  border: 4px solid var(--color-border);
  display: grid;
  place-items: center;
  font-weight: bold;
`;

const RankNumber = styled.div`
  font-size: 3rem;
  font-family: var(--font-heading);
  color: #fff;
  opacity: 0.8;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`;

const TeamName = styled.div`
  position: absolute;
  top: -40px;
  font-weight: bold;
  text-align: center;
  width: 200%;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
  font-family: var(--font-heading);
  color: var(--color-primary);
`;

const Table = styled(motion.div)`
  background: #111;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 1fr;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255,255,255,0.02);
  }
  
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const HeaderRow = styled(Row)`
  background: rgba(0,0,0,0.2);
  font-family: var(--font-heading);
  color: var(--color-primary);
  font-weight: bold;
  letter-spacing: 0.05em;
  
  &:hover { background: rgba(0,0,0,0.2); }
`;

const Leaderboard = () => {
  // Enhanced dummy data with "Lore"
  const teams = [
    { rank: 1, name: "Nexus Prime", score: 9850, school: "Cyberdyne Institute" },
    { rank: 2, name: "Iron Legion", score: 9420, school: "Stark Academy" },
    { rank: 3, name: "Volt Runners", score: 8900, school: "Tesla High" },
    { rank: 4, name: "Binary Bandits", score: 8450, school: "Silicon Valley Prep" },
    { rank: 5, name: "Mech-Mindset", score: 8100, school: "Boston Dynamics Future" },
    { rank: 6, name: "Quantum Core", score: 7850, school: "MIT Junior League" },
    { rank: 7, name: "Gear Grinders", score: 7600, school: "Detroit Mecha" },
    { rank: 8, name: "Circuit Breakers", score: 7400, school: "Shenzhen Tech" }
  ];

  return (
    <PageContainer>
      <TextReveal>
        <h1 style={{ textAlign: 'center', marginBottom: '4rem' }}>Global Rankings</h1>
      </TextReveal>

      <PodiumContainer>
        {/* Rank 2 - Left */}
        <PodiumStep
          rank={2}
          initial={{ height: 0 }}
          animate={{ height: 250 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Tilt className="podium-tilt" scale={1.1}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TeamName style={{ fontSize: '1rem', position: 'relative', top: 0, marginBottom: '1rem' }}>Iron Legion</TeamName>
              <Avatar>IL</Avatar>
              <RankNumber>2</RankNumber>
            </div>
          </Tilt>
        </PodiumStep>

        {/* Rank 1 - Center, Tallest */}
        <PodiumStep
          rank={1}
          style={{ zIndex: 2 }}
          initial={{ height: 0 }}
          animate={{ height: 350 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <Tilt className="podium-tilt" scale={1.1} glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffd700" glarePosition="all">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TeamName style={{ fontSize: '1.4rem', color: 'var(--color-secondary)', position: 'relative', top: 0, marginBottom: '1rem' }}>Nexus Prime</TeamName>
              <Avatar style={{ borderColor: 'var(--color-primary)' }}>NP</Avatar>
              <RankNumber>1</RankNumber>
            </div>
          </Tilt>
        </PodiumStep>

        {/* Rank 3 - Right */}
        <PodiumStep
          rank={3}
          initial={{ height: 0 }}
          animate={{ height: 200 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <Tilt className="podium-tilt" scale={1.1}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TeamName style={{ fontSize: '1rem', position: 'relative', top: 0, marginBottom: '1rem' }}>Volt Runners</TeamName>
              <Avatar>VR</Avatar>
              <RankNumber>3</RankNumber>
            </div>
          </Tilt>
        </PodiumStep>
      </PodiumContainer>

      <Table
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <HeaderRow>
          <div>Rank</div>
          <div>Unit Identifier</div>
          <div>Origin Sector</div>
          <div>Performance Index</div>
        </HeaderRow>
        {teams.slice(3).map((team) => (
          <Row key={team.rank}>
            <div style={{ fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>#{team.rank}</div>
            <div>{team.name}</div>
            <div style={{ opacity: 0.7 }}>{team.school}</div>
            <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}>{team.score}</div>
          </Row>
        ))}
      </Table>
    </PageContainer>
  );
};

export default Leaderboard;
