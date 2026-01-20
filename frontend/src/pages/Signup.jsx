import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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
  max-width: 400px;
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
  
  &:focus {
    border-color: var(--color-primary);
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--color-secondary);
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 5px;
  margin-top: 1rem;
  
  &:hover {
    background: #ff2a5d;
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/v1/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/register');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <PageContainer>
      <FormContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Title>Sign Up</Title>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Name</Label>
            <Input name="name" type="text" onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input name="email" type="email" onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input name="password" type="password" onChange={handleChange} required />
          </FormGroup>
          <Button type="submit">Sign Up</Button>
        </form>
        <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#888' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)' }}>Login</Link>
        </p>
      </FormContainer>
    </PageContainer>
  );
};

export default Signup;
