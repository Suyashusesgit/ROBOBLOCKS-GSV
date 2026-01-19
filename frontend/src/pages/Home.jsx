import React from 'react';
import Hero from '../components/Hero';
import styled from 'styled-components';

import Timeline from '../components/Timeline';

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--color-border);
`;

import Sponsors from '../components/Sponsors';
import ParticleBackground from '../components/ParticleBackground';
import Organizers from '../components/Organizers';
import HorizontalScroll from '../components/HorizontalScroll';

const Home = () => {
    return (
        <>
            <ParticleBackground />
            <Hero />
            <HorizontalScroll />
            <Sponsors />
            <Organizers />
        </>
    );
};

export default Home;
