import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import Tilt from 'react-parallax-tilt';
import teamService from '../services/teamService';

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
  cursor: pointer;
  
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
  color: #fff;
  font-size: 1.2rem;
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
  top: -60px;
  font-weight: bold;
  text-align: center;
  width: 250%;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
  font-family: var(--font-heading);
  color: var(--color-primary);
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Table = styled(motion.div)`
  background: #111;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  overflow-x: auto; /* Enable horizontal scroll */
  -webkit-overflow-scrolling: touch;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 2fr 1fr 1fr;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
  transition: background 0.2s;
  min-width: 800px; /* Force scroll on small screens */

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

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    font-size: 1.5rem;
    color: var(--color-primary);
`;

const Leaderboard = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await teamService.getAllTeams();
        // Sort by score descending
        const sorted = data.sort((a, b) => (b.score || 0) - (a.score || 0));

        // Add rank
        const ranked = sorted.map((team, index) => ({
          ...team,
          rank: index + 1
        }));

        setTeams(ranked);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <LoadingContainer>Loading Ranking Data...</LoadingContainer>;

  const top3 = teams.slice(0, 3);
  const rest = teams.slice(3);

  // Helper to get initials
  const getInitials = (name) => name ? name.substring(0, 2).toUpperCase() : '??';

  return (
    <PageContainer>
      <TextReveal>
        <h1 style={{ textAlign: 'center', marginBottom: '4rem' }}>Global Rankings</h1>
      </TextReveal>

      {teams.length > 0 ? (
        <>
          <PodiumContainer>
            {/* Rank 2 (Left) */}
            {top3[1] && (
              <PodiumStep
                rank={2}
                initial={{ height: 0 }}
                animate={{ height: 250 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Tilt className="podium-tilt" scale={1.1}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TeamName style={{ marginBottom: '1rem' }}>{top3[1].teamName}</TeamName>
                    <Avatar>{getInitials(top3[1].teamName)}</Avatar>
                    <RankNumber>2</RankNumber>
                    <div style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '0.5rem' }}>{top3[1].score || 0} PTS</div>
                  </div>
                </Tilt>
              </PodiumStep>
            )}

            {/* Rank 1 (Center) */}
            {top3[0] && (
              <PodiumStep
                rank={1}
                style={{ zIndex: 2 }}
                initial={{ height: 0 }}
                animate={{ height: 350 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <Tilt className="podium-tilt" scale={1.1} glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffd700" glarePosition="all">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TeamName style={{ fontSize: '1.2rem', color: 'var(--color-secondary)', marginBottom: '1rem' }}>{top3[0].teamName}</TeamName>
                    <Avatar style={{ borderColor: 'var(--color-primary)', background: 'var(--color-primary)', color: '#000' }}>
                      {getInitials(top3[0].teamName)}
                    </Avatar>
                    <RankNumber>1</RankNumber>
                    <div style={{ color: '#fff', fontSize: '1rem', marginTop: '0.5rem', fontWeight: 'bold' }}>{top3[0].score || 0} PTS</div>
                  </div>
                </Tilt>
              </PodiumStep>
            )}

            {/* Rank 3 (Right) */}
            {top3[2] && (
              <PodiumStep
                rank={3}
                initial={{ height: 0 }}
                animate={{ height: 200 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Tilt className="podium-tilt" scale={1.1}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TeamName style={{ marginBottom: '1rem' }}>{top3[2].teamName}</TeamName>
                    <Avatar>{getInitials(top3[2].teamName)}</Avatar>
                    <RankNumber>3</RankNumber>
                    <div style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '0.5rem' }}>{top3[2].score || 0} PTS</div>
                  </div>
                </Tilt>
              </PodiumStep>
            )}
          </PodiumContainer>

          <Table
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <HeaderRow>
              <div>Rank</div>
              <div>Unit Identifier</div>
              <div>Sector (Institute)</div>
              <div>Status</div>
              <div style={{ textAlign: 'right' }}>Performance Index</div>
            </HeaderRow>
            {rest.map((team) => (
              <Row key={team._id || team.rank}>
                <div style={{ fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>#{team.rank}</div>
                <div style={{ fontWeight: '500', color: '#fff' }}>{team.teamName}</div>
                <div style={{ opacity: 0.7 }}>{team.institute}</div>
                <div>
                  <span style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    background: team.paymentStatus === 'verified' ? 'rgba(0, 255, 106, 0.1)' : 'rgba(255, 206, 0, 0.1)',
                    color: team.paymentStatus === 'verified' ? '#00ff6a' : '#ffce00',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                  }}>
                    {team.paymentStatus === 'verified' ? 'Active' : 'Pending'}
                  </span>
                </div>
                <div style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)', textAlign: 'right' }}>{team.score || 0}</div>
              </Row>
            ))}
          </Table>
        </>
      ) : (
        <div style={{ textAlign: 'center', opacity: 0.6 }}>No data available yet via Subspace Relay.</div>
      )}
    </PageContainer>
  );
};

export default Leaderboard;
