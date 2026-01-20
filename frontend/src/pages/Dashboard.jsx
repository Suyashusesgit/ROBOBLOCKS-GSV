import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import TextReveal from '../components/TextReveal';
import teamService from '../services/teamService';

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 3rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 0 20px var(--color-primary);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: var(--color-secondary);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: var(--color-secondary);
    box-shadow: 0 0 10px var(--color-secondary);
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  background: rgba(0,0,0,0.5);
  border: 1px solid ${props =>
    props.status === 'verified' ? '#00ff6a' :
      props.status === 'rejected' ? '#ff003c' : '#ffce00'};
  color: #fff;
  box-shadow: 0 0 15px ${props =>
    props.status === 'verified' ? 'rgba(0,255,106,0.2)' :
      props.status === 'rejected' ? 'rgba(255,0,60,0.2)' : 'rgba(255,206,0,0.2)'};

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props =>
    props.status === 'verified' ? '#00ff6a' :
      props.status === 'rejected' ? '#ff003c' : '#ffce00'};
    box-shadow: 0 0 10px ${props =>
    props.status === 'verified' ? '#00ff6a' :
      props.status === 'rejected' ? '#ff003c' : '#ffce00'};
  }
`;

const DataList = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const DataItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.span`
  color: #666;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Value = styled.span`
  color: #fff;
  font-size: 1.1rem;
  font-family: var(--font-heading);
`;

const MemberRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255,255,255,0.03);
  border-left: 2px solid transparent;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255,255,255,0.06);
    border-left-color: var(--color-primary);
  }
`;

const Dashboard = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamService.getMyTeam();
        setTeam(data);
      } catch (err) {
        console.error("Failed to fetch team", err);
        setTeam(null);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  /* ... imports ... */

  /* ... styles ... */

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await teamService.uploadSubmission(team._id, file, type);
      // Refresh team data
      const updatedTeam = await teamService.getMyTeam();
      setTeam(updatedTeam);
      alert("File uplink established. Transmission complete.");
    } catch (err) {
      console.error(err);
      alert("Transmission failed. Check protocols.");
    }
  };

  if (loading) return <DashboardContainer>Loading...</DashboardContainer>;
  if (!team) return <DashboardContainer>No team data.</DashboardContainer>;

  return (
    <DashboardContainer>
      <Header>
        <div>
          <label style={{ color: 'var(--color-primary)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>COMMAND CENTER</label>
          <TextReveal><Title>DASHBOARD</Title></TextReveal>
        </div>
        <StatusBadge status={team.paymentStatus}>{team.paymentStatus}</StatusBadge>
      </Header>

      <Grid>
        {/* Team Info Column */}
        <div style={{ gridColumn: 'span 4' }}>
          <GlassCard
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SectionTitle>Unit Details</SectionTitle>
            <DataList>
              <DataItem>
                <Label>Designation</Label>
                <Value>{team.teamName}</Value>
              </DataItem>
              <DataItem>
                <Label>Affiliation</Label>
                <Value>{team.institute}</Value>
              </DataItem>
              <DataItem>
                <Label>Comms Link</Label>
                <Value>{team.leaderPhone}</Value>
              </DataItem>
            </DataList>
          </GlassCard>
        </div>

        {/* Submissions Column (New) */}
        <div style={{ gridColumn: 'span 4' }}>
          <GlassCard
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <SectionTitle>Mission Data</SectionTitle>
            <DataList>
              {/* Abstract Upload */}
              <DataItem>
                <Label>Abstract Protocol</Label>
                {team.abstractFile ? (
                  <Value style={{ color: '#00ff6a' }}>UPLOADED</Value>
                ) : (
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleUpload(e, 'abstract')}
                    style={{ color: '#fff' }}
                  />
                )}
              </DataItem>

              {/* CAD Upload */}
              <DataItem>
                <Label>Blueprints (CAD)</Label>
                {team.cadFile ? (
                  <Value style={{ color: '#00ff6a' }}>SECURED</Value>
                ) : (
                  <input
                    type="file"
                    accept=".zip,.rar"
                    onChange={(e) => handleUpload(e, 'cad')}
                    style={{ color: '#fff' }}
                  />
                )}
              </DataItem>

              <DataItem>
                <Label>Mission Status</Label>
                <Value>{team.submissionStatus || 'PENDING'}</Value>
              </DataItem>
            </DataList>
          </GlassCard>
        </div>

        {/* Members Column */}
        <div style={{ gridColumn: 'span 4' }}>
          <GlassCard
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SectionTitle>Squad Roster</SectionTitle>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {team.members.map((member, i) => (
                <MemberRow key={i}>
                  <div>
                    <Value style={{ fontSize: '1rem' }}>{member.name}</Value>
                    <Label style={{ display: 'block', marginTop: '0.2rem' }}>{member.email}</Label>
                  </div>
                  <Label style={{ color: 'var(--color-primary)' }}>{member.role || 'Operator'}</Label>
                </MemberRow>
              ))}
            </div>
          </GlassCard>
        </div>
      </Grid>
    </DashboardContainer>
  );
};

export default Dashboard;
