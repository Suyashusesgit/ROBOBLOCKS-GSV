import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { motion } from 'framer-motion';

const DashboardContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.header`
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
`;

const Title = styled.h1`
  color: var(--color-primary);
  font-size: 2.5rem;
`;

const Section = styled(motion.section)`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${props =>
        props.status === 'verified' ? '#00ff6a' :
            props.status === 'rejected' ? '#ff003c' :
                '#ffce00'};
  color: #000;
`;

const Label = styled.span`
  color: #aaa;
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
`;

const Value = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
`;

const MemberList = styled.ul`
  list-style: none;
`;

const MemberItem = styled.li`
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Dashboard = () => {
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const token = localStorage.getItem('token');

                // MOCK DATA for visualization if auth fails or no token
                const mockTeam = {
                    teamName: "CyberTitans",
                    institute: "Galactic Institute of Technology",
                    leaderPhone: "+91 98765 43210",
                    paymentStatus: "verified",
                    members: [
                        { name: "John Doe", email: "john@galaxy.edu", phone: "9876543210" },
                        { name: "Jane Smith", email: "jane@galaxy.edu", phone: "9876543211" },
                        { name: "Robert Fox", email: "robert@galaxy.edu", phone: "9876543212" },
                        { name: "Alice Cooper", email: "alice@galaxy.edu", phone: "9876543213" }
                    ]
                };

                if (!token) {
                    // DEMO MODE: Set dummy data immediately if no token
                    console.log("No token found, using dummy data for demo.");
                    setTeam(mockTeam);
                    setLoading(false);
                    return;
                }

                const res = await axios.get('http://localhost:5000/api/v1/teams/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTeam(res.data);
            } catch (err) {
                console.error("API Error, falling back to dummy data:", err);
                // Fallback to dummy data on error for demo purposes
                const mockTeam = {
                    teamName: "CyberTitans",
                    institute: "Galactic Institute of Technology",
                    leaderPhone: "+91 98765 43210",
                    paymentStatus: "verified",
                    members: [
                        { name: "John Doe", email: "john@galaxy.edu", phone: "9876543210" },
                        { name: "Jane Smith", email: "jane@galaxy.edu", phone: "9876543211" },
                        { name: "Robert Fox", email: "robert@galaxy.edu", phone: "9876543212" },
                        { name: "Alice Cooper", email: "alice@galaxy.edu", phone: "9876543213" }
                    ]
                };
                setTeam(mockTeam);
                // setError(err.response?.data?.message || 'Failed to fetch team data');
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    if (loading) return <DashboardContainer>Loading...</DashboardContainer>;
    if (error) return <DashboardContainer style={{ color: 'red' }}>{error}</DashboardContainer>;
    if (!team) return <DashboardContainer>No team registered yet.</DashboardContainer>;

    return (
        <DashboardContainer>
            <Header>
                <Title>Team Dashboard</Title>
            </Header>

            <Section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Status</h2>
                <div style={{ marginTop: '1rem' }}>
                    <StatusBadge status={team.paymentStatus}>{team.paymentStatus}</StatusBadge>
                </div>
            </Section>

            <Section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
            >
                <h2>Team Details</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
                    <div>
                        <Label>Team Name</Label>
                        <Value>{team.teamName}</Value>
                    </div>
                    <div>
                        <Label>Institute</Label>
                        <Value>{team.institute}</Value>
                    </div>
                    <div>
                        <Label>Leader Phone</Label>
                        <Value>{team.leaderPhone}</Value>
                    </div>
                </div>
            </Section>

            <Section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h2>Members</h2>
                <MemberList>
                    {team.members.map((member, index) => (
                        <MemberItem key={index}>
                            <span>{member.name}</span>
                            <span style={{ color: '#aaa' }}>{member.email}</span>
                        </MemberItem>
                    ))}
                </MemberList>
            </Section>
        </DashboardContainer>
    );
};

export default Dashboard;
