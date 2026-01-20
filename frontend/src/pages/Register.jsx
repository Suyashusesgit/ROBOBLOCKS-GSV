import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import teamService from '../services/teamService';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled(motion.div)`
  background: var(--color-glass);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  width: 100%;
  max-width: 600px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media(max-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-primary);
  font-family: var(--font-heading);
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
  cursor: pointer;
  border: none;
  
  &:hover {
    background: #fff;
  }
`;
const Register = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <FormContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', padding: '4rem 2rem' }}
      >
        <Title style={{ fontSize: '2rem', marginBottom: '1rem' }}>ROBOBLOCKS</Title>
        <h3 style={{
          fontSize: '1.5rem',
          color: '#fff',
          letterSpacing: '0.2em',
          marginBottom: '2rem',
          textTransform: 'uppercase'
        }}>
          Registration Opens Soon
        </h3>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>
          Prepare your teams. The arena awaits.
        </p>
        <Button onClick={() => navigate('/')}>
          Return to Base
        </Button>
      </FormContainer>
    </PageContainer>
  );
};

export default Register;
