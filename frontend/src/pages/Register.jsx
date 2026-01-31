import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import teamService from '../services/teamService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled(motion.div)`
  background: rgba(17, 17, 17, 0.85);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  width: 100%;
  max-width: 800px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 0 30px rgba(0,0,0,0.5);

  @media(max-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-primary);
  font-family: var(--font-heading);
  letter-spacing: 2px;
`;

const SectionTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin: 1.5rem 0 1rem;
  border-bottom: 1px solid #333;
  padding-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media(max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #aaa;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--color-border);
  border-radius: 5px;
  color: #fff;
  font-family: inherit;
  transition: all 0.3s;
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
  }
`;

const FileInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed var(--color-border);
  border-radius: 5px;
  color: #ccc;
  cursor: pointer;

  &::file-selector-button {
    background: #333;
    border: none;
    color: #fff;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    border-radius: 3px;
    cursor: pointer;
  }
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
  margin-top: 2rem;
  transition: all 0.3s;
  cursor: pointer;
  border: none;
  font-family: var(--font-heading);
  
  &:hover {
    background: #fff;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 240, 255, 0.3);
  }

  &:disabled {
    background: #333;
    color: #666;
    cursor: not-allowed;
    transform: none;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    teamName: '',
    institute: '',
    leaderPhone: '',
    paymentProof: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, paymentProof: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.paymentProof) {
      toast.error("Please upload payment proof");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Registering team...");

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append('teamName', formData.teamName);
      data.append('institute', formData.institute);
      data.append('leaderPhone', formData.leaderPhone);
      data.append('paymentProof', formData.paymentProof);

      await teamService.registerTeam(data);

      toast.success("Registration Successful!", { id: toastId });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>TEAM ENTRY PROTOCOL</Title>
        <form onSubmit={handleSubmit}>

          <SectionTitle>Unit Details</SectionTitle>
          <Grid>
            <FormGroup>
              <Label>Team Name</Label>
              <Input name="teamName" required onChange={handleChange} placeholder="e.g. Cyber Ninjas" />
            </FormGroup>
            <FormGroup>
              <Label>Institute / Organization</Label>
              <Input name="institute" required onChange={handleChange} placeholder="University Name" />
            </FormGroup>
          </Grid>

          <SectionTitle>Command Link</SectionTitle>
          <Grid>
            <FormGroup>
              <Label>Leader Phone</Label>
              <Input name="leaderPhone" required onChange={handleChange} placeholder="+91 9876543210" />
            </FormGroup>
            <FormGroup>
              <Label>Payment Proof (Screenshot)</Label>
              <FileInput type="file" required onChange={handleFileChange} accept="image/*" />
            </FormGroup>
          </Grid>

          <Button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Initialize Team Registration'}
          </Button>

        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default Register;
