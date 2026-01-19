import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  padding: 8rem 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 2rem;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.6;
`;

export const About = () => (
    <PageContainer>
        <Title>About RoboBlocks</Title>
        <Content>
            <p>RoboBlocks is the premier national-level robotics event...</p>
        </Content>
    </PageContainer>
);

export const Rules = () => (
    <PageContainer>
        <Title>Competition Rules</Title>
        <Content>
            <p>1. Only teams of up to 4 members allowed.</p>
            <p>2. Robots must adhere to dimensions...</p>
        </Content>
    </PageContainer>
);

export const Teams = () => (
    <PageContainer>
        <Title>Participating Teams</Title>
        <Content>
            <p>List of teams will appear here...</p>
        </Content>
    </PageContainer>
);
