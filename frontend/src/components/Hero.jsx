import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import Hero3D from './Hero3D';
import GlitchText from './GlitchText';
import { Suspense } from 'react';

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0 2rem;
  background-color: var(--color-bg);
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 10;
  mix-blend-mode: difference;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  pointer-events: none; /* Let clicks pass through to 3D scene */
`;

const Title = styled(motion.h1)`
  font-size: 6rem;
  line-height: 1;
  margin-bottom: 2rem;
  color: #fff;
  width: 100%;
  text-align: center;
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
  text-shadow: 0 0 40px rgba(255, 255, 255, 0.1);
  
  @media (max-width: 1024px) {
    font-size: 4rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 3rem;
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Countdown = styled(motion.div)`
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  color: var(--color-text);
  margin-top: 2rem;
  padding: 1rem 2rem;
  border: 1px solid var(--color-primary);
  background: rgba(0, 255, 0, 0.05);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  span {
    color: var(--color-primary);
    font-weight: bold;
    margin: 0 0.5rem;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <CanvasContainer>
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </CanvasContainer>

      <HeroContent>
        <TextReveal delay={0.2}>
          <Title as="h1">
            <GlitchText>ROBOBLOCKS</GlitchText>
          </Title>
        </TextReveal>
        <TextReveal delay={0.4}>
          <Subtitle as="p">
            National Level Robotics Event
          </Subtitle>
        </TextReveal>

        <TextReveal delay={0.6}>
          <Countdown
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            T-Minus <span>14</span> Days <span>08</span> Hours <span>WARP SPEED</span>
          </Countdown>
        </TextReveal>

      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
