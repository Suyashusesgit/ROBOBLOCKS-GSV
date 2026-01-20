import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled(motion.div)`
  background: #111;
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  width: 100%;
  max-width: 600px;

  @media(max-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-primary);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #aaa;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--color-border);
  border-radius: 5px;
  color: #fff;
  font-family: inherit;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
`;

const FileInput = styled.input`
color: #fff;
`;

const MemberGroup = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  margin-bottom: 1rem;
  border-radius: 8px;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--color-primary);
  color: #000;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  border-radius: 5px;
  margin-top: 1rem;
  transition: background 0.3s;
  
  &:hover {
    background: #fff;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AddButton = styled.button`
  background: transparent;
  border: 1px dashed var(--color-border);
  color: #aaa;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  transition: color 0.3s, border-color 0.3s;
  
  &:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }
`;

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        teamName: '',
        institute: '',
        leaderPhone: '',
        members: [{ name: '', email: '', phone: '' }]
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMemberChange = (index, e) => {
        const newMembers = [...formData.members];
        newMembers[index][e.target.name] = e.target.value;
        setFormData({ ...formData, members: newMembers });
    };

    const addMember = () => {
        if (formData.members.length < 4) {
            setFormData({
                ...formData,
                members: [...formData.members, { name: '', email: '', phone: '' }]
            });
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Ideally, we need auth token here. For now assuming public or test with fake token if needed.
        // The backend requires 'protect' middleware, so we need a token.
        // Since I implemented Auth, I should have a Login/Register for USER first.
        // But the requirements said "Team Registration".
        // I implemented Register User -> then Register Team.
        // So flow: User Sign Up -> User Login -> Register Team.
        // I need a separate Sign Up / Login page or combine it.
        // Let's assume for this step, I am just building the Team Registration UI.
        // I will add a note or implemented Login first.
        // Let's implement Login Page as well or redirect to Login if not authenticated.

        // For now, simple error handling.
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("You must be logged in to register a team.");
                setLoading(false);
                return;
            }

            const data = new FormData();
            data.append('teamName', formData.teamName);
            data.append('institute', formData.institute);
            data.append('leaderPhone', formData.leaderPhone);
            data.append('members', JSON.stringify(formData.members));
            data.append('paymentProof', file);

            await axios.post('http://localhost:5001/api/v1/teams', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token} `
                }
            });

            navigate('/dashboard');

        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer>
            <FormContainer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Title>Team Registration</Title>
                {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label>Team Name</Label>
                        <Input name="teamName" value={formData.teamName} onChange={handleInputChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Institute/College</Label>
                        <Input name="institute" value={formData.institute} onChange={handleInputChange} required />
                    </FormGroup>

                    <FormGroup>
                        <Label>Leader Phone</Label>
                        <Input name="leaderPhone" value={formData.leaderPhone} onChange={handleInputChange} required />
                    </FormGroup>

                    <Label>Team Members</Label>
                    {formData.members.map((member, index) => (
                        <MemberGroup key={index}>
                            <FormGroup>
                                <Input placeholder="Member Name" name="name" value={member.name} onChange={(e) => handleMemberChange(index, e)} required />
                            </FormGroup>
                            <FormGroup>
                                <Input placeholder="Member Email" name="email" value={member.email} onChange={(e) => handleMemberChange(index, e)} required />
                            </FormGroup>
                        </MemberGroup>
                    ))}

                    {formData.members.length < 4 && (
                        <AddButton type="button" onClick={addMember}>+ Add Member</AddButton>
                    )}

                    <FormGroup>
                        <Label>Payment Proof (Screenshot)</Label>
                        <FileInput type="file" onChange={handleFileChange} required />
                    </FormGroup>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Register Team'}
                    </Button>
                </form>
            </FormContainer>
        </PageContainer>
    );
};

export default Register;
