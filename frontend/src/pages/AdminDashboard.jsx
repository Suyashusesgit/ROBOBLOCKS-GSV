import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import teamService from '../services/teamService';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: var(--color-primary);
  margin-bottom: 2rem;
`;

const TableContainer = styled(motion.div)`
  background: #111;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

const Th = styled.th`
  text-align: left;
  padding: 1.5rem;
  background: #222;
  color: #aaa;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
`;

const Td = styled.td`
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  color: #fff;
  vertical-align: middle;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${props => props.approve ? 'var(--color-primary)' : '#ff003c'};
  color: #000;
  opacity: 0.8;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 1;
  }
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${props =>
        props.status === 'verified' ? 'rgba(0, 255, 106, 0.2)' :
            props.status === 'rejected' ? 'rgba(255, 0, 60, 0.2)' :
                'rgba(255, 206, 0, 0.2)'};
  color: ${props =>
        props.status === 'verified' ? '#00ff6a' :
            props.status === 'rejected' ? '#ff003c' :
                '#ffce00'};
`;

const AdminDashboard = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);

    // DUMMY DATA FOR DEMO IF API FAILS
    const dummyTeams = [
        { _id: '1', teamName: 'Alpha Squad', institute: 'MIT', leaderPhone: '1234567890', paymentStatus: 'pending', members: [] },
        { _id: '2', teamName: 'Beta Bots', institute: 'Stanford', leaderPhone: '0987654321', paymentStatus: 'verified', members: [] },
        { _id: '3', teamName: 'Gamma Gears', institute: 'CalTech', leaderPhone: '1122334455', paymentStatus: 'rejected', members: [] },
    ];

    const fetchTeams = async () => {
        try {
            const data = await teamService.getAllTeams();
            setTeams(data);
        } catch (err) {
            console.error(err);
            setTeams(dummyTeams); // Fallback to dummy
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            // Optimistic update
            setTeams(teams.map(t => t._id === id ? { ...t, paymentStatus: status } : t));
            await teamService.updateTeamStatus(id, status);
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <PageContainer>
            <Title>Admin Dashboard</Title>
            <TableContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Table>
                    <thead>
                        <tr>
                            <Th>Team Name</Th>
                            <Th>Institute</Th>
                            <Th>Leader Phone</Th>
                            <Th>Payment Proof</Th>
                            <Th>Status</Th>
                            <Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(team => (
                            <tr key={team._id}>
                                <Td>{team.teamName}</Td>
                                <Td>{team.institute}</Td>
                                <Td>{team.leaderPhone}</Td>
                                <Td><a href="#" style={{ textDecoration: 'underline' }}>View File</a></Td>
                                <Td><StatusBadge status={team.paymentStatus}>{team.paymentStatus}</StatusBadge></Td>
                                <Td>
                                    <ActionButton approve onClick={() => updateStatus(team._id, 'verified')}>Verify</ActionButton>
                                    <ActionButton onClick={() => updateStatus(team._id, 'rejected')}>Reject</ActionButton>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>
        </PageContainer>
    );
};

export default AdminDashboard;
