import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import TextReveal from './TextReveal';

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
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  mix-blend-mode: difference;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  line-height: 1.1;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, #aaa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 100%;
  text-align: center;
  
  @media (max-width: 1024px) {
    font-size: 4rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: var(--color-primary);
`;

const SVGContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  z-index: 1;
  opacity: 0.5;
`;

const Hero = () => {
  const svgRef = useRef(null);

  // GSAP Animation removed in favor of internal SVG animations for better performance
  // useEffect(() => {}, []);

  return (
    <HeroSection>
      <SVGContainer ref={svgRef}>
        {/* Advanced Futuristic Hero Animation */}
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#7000ff" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Rotating Rings */}
          <g className="rings-group">
            {/* Outer Ring */}
            <circle cx="100" cy="100" r="80" stroke="url(#grad1)" strokeWidth="0.5" fill="none" strokeDasharray="10 5">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="60s" repeatCount="indefinite" />
            </circle>
            <circle cx="100" cy="100" r="75" stroke="var(--color-primary)" strokeWidth="0.2" fill="none" opacity="0.3">
              <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="40s" repeatCount="indefinite" />
            </circle>

            {/* Middle Ring */}
            <circle cx="100" cy="100" r="55" stroke="var(--color-secondary)" strokeWidth="1" fill="none" strokeDasharray="50 150" filter="url(#glow)">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
            </circle>

            {/* Inner Graphic */}
            <path d="M100 40 L160 140 L40 140 Z" stroke="var(--color-accent)" strokeWidth="0.5" fill="none" opacity="0.5">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="-360 100 100" dur="30s" repeatCount="indefinite" />
            </path>
            <circle cx="100" cy="100" r="20" fill="var(--color-primary)" opacity="0.1">
              <animate attributeName="r" values="20;25;20" dur="4s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </SVGContainer>
      <HeroContent>
        <TextReveal delay={0.2}>
          <Title as="h1">
            FUTURE IS NOW
          </Title>
        </TextReveal>
        <TextReveal delay={0.4}>
          <Subtitle as="p">
            National Level Robotics Event
          </Subtitle>
        </TextReveal>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
