import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import teamService from '../services/teamService';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

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

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? '#000' : '#fff'};
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
  font-family: var(--font-heading);

  &:hover {
    background: var(--color-primary);
    color: #000;
  }
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
  min-width: 1000px;
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
  
  &:hover { opacity: 1; }
`;

const StatusBadge = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  background: ${props =>
        props.status === 'verified' || props.status === 'approved' ? 'rgba(0, 255, 106, 0.2)' :
            props.status === 'rejected' ? 'rgba(255, 0, 60, 0.2)' :
                'rgba(255, 206, 0, 0.2)'};
  color: ${props =>
        props.status === 'verified' || props.status === 'approved' ? '#00ff6a' :
            props.status === 'rejected' ? '#ff003c' :
                '#ffce00'};
`;

const EditorContainer = styled.div`
  background: #111;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
`;

const JsonArea = styled.textarea`
  width: 100%;
  height: 500px;
  background: #000;
  color: #0f0;
  font-family: monospace;
  padding: 1rem;
  border: 1px solid #333;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('teams');
    const [teams, setTeams] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchTeams = async () => {
        try {
            const data = await teamService.getAllTeams();
            setTeams(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchContent = async () => {
        try {
            const data = await teamService.getSiteContent();
            // Remove huge identifying fields if needed, but for now show all
            setContent(JSON.stringify(data, null, 2));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTeams();
        fetchContent();
        setLoading(false);
    }, []);

    const updateStatus = async (id, status) => {
        try {
            // Optimistic update
            setTeams(teams.map(t => t._id === id ? { ...t, paymentStatus: status } : t));
            await teamService.updateTeamStatus(id, status);
            toast.success(`Unit status updated to: ${status}`);
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const handleSaveContent = async () => {
        const loadingToast = toast.loading('Uploading patch...');
        try {
            const parsed = JSON.parse(content);
            await teamService.updateContent(parsed);
            toast.success("Content Grid Updated Successfully", { id: loadingToast });
        } catch (e) {
            toast.error("Invalid JSON Formatting!", { id: loadingToast });
        }
    };

    return (
        <PageContainer>
            <Title>Admin Command</Title>

            <TabContainer>
                <Tab active={activeTab === 'teams'} onClick={() => setActiveTab('teams')}>UNIT MANAGEMENT</Tab>
                <Tab active={activeTab === 'content'} onClick={() => setActiveTab('content')}>GLOBAL CONTENT</Tab>
            </TabContainer>

            {activeTab === 'teams' ? (
                <TableContainer
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Table>
                        <thead>
                            <tr>
                                <Th>Team Name</Th>
                                <Th>Institute</Th>
                                <Th>Leader Info</Th>
                                <Th>Abstract</Th>
                                <Th>CAD</Th>
                                <Th>Status</Th>
                                <Th>Actions</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map(team => (
                                <tr key={team._id}>
                                    <Td>{team.teamName}</Td>
                                    <Td>{team.institute}</Td>
                                    <Td>
                                        <div>{team.leaderPhone}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#888' }}>{team.user?.email}</div>
                                    </Td>
                                    <Td>
                                        {team.abstractFile ?
                                            <a href={`/${team.abstractFile}`} target="_blank" style={{ color: '#00ff6a' }}>View PDF</a> :
                                            <span style={{ color: '#555' }}>Pending</span>
                                        }
                                    </Td>
                                    <Td>
                                        {team.cadFile ?
                                            <a href={`/${team.cadFile}`} style={{ color: '#00ff6a' }}>Download</a> :
                                            <span style={{ color: '#555' }}>Pending</span>
                                        }
                                    </Td>
                                    <Td>
                                        <StatusBadge status={team.paymentStatus}>{team.paymentStatus}</StatusBadge>
                                        <div style={{ marginTop: '0.5rem' }}>
                                            Submission: <StatusBadge status={team.submissionStatus}>{team.submissionStatus}</StatusBadge>
                                        </div>
                                    </Td>
                                    <Td>
                                        <ActionButton approve onClick={() => updateStatus(team._id, 'verified')}>Approve</ActionButton>
                                        <ActionButton onClick={() => updateStatus(team._id, 'rejected')}>Reject</ActionButton>
                                    </Td>
                                tr>
                            ))}
                                </tbody>
                    </Table>
                </TableContainer>
            ) : (
                <EditorContainer>
                    <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Direct Database Injection</h3>
                    <p style={{ color: '#888', marginBottom: '1rem' }}>Edit the raw JSON below to update site content in real-time. Be careful with syntax.</p>
                    <JsonArea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        spellCheck="false"
                    />
                    <ActionButton approve onClick={handleSaveContent} style={{ width: '200px' }}>UPLOAD PATCH</ActionButton>
                </EditorContainer>
            )}
        </PageContainer>
    );
};

export default AdminDashboard;
