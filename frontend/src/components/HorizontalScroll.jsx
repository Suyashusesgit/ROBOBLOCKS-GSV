import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  width: 300%;
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    flex-direction: column;
  }
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    overflow: visible;
  }
`;

const Panel = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  &:nth-child(odd) {
    background: rgba(255, 255, 255, 0.02);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 100vh;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const Year = styled.h2`
  font-size: 8rem;
  color: transparent;
  -webkit-text-stroke: 2px rgba(255, 255, 255, 0.15);
  position: absolute;
  top: 10%;
  left: 5%;
  font-family: var(--font-heading);
  opacity: 0.8;
`;

const Content = styled.div`
  max-width: 600px;
  z-index: 2;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 2rem;
`;

const Desc = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #ccc;
`;

const events = [
  { year: "PHASE 1", title: "Registration", desc: "Teams register and submit their initial robot concepts for review. Access to documentation and grid specs." },
  { year: "PHASE 2", title: "Idea Submission", desc: "Detailed CAD designs and strategy documents are submitted. Top 50 teams qualify for the technical interview." },
  { year: "PHASE 3", title: "Grand Finale", desc: "The final showdown. 48 hours of non-stop robotics action in the RoboBlocks Arena." },
];

const HorizontalScroll = ({ data }) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  const events = data || [
    { year: "PHASE 1", title: "Registration", desc: "Teams register and submit their initial robot concepts for review. Access to documentation and grid specs." },
    { year: "PHASE 2", title: "Idea Submission", desc: "Detailed CAD designs and strategy documents are submitted. Top 50 teams qualify for the technical interview." },
    { year: "PHASE 3", title: "Grand Finale", desc: "The final showdown. 48 hours of non-stop robotics action in the RoboBlocks Arena." },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Only animate on desktop
      const isDesktop = window.matchMedia("(min-width: 769px)").matches;

      if (isDesktop) {
        gsap.to(sectionRef.current, {
          translateX: `-${(events.length - 1) * 100}vw`,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${events.length * 1000}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, triggerRef);

    return () => {
      ctx.revert(); // This safely cleans up all GSAP animations and ScrollTriggers created in the context
    };
  }, [events.length]);

  return (
    <div style={{ overflow: 'hidden' }}>
      <SectionWrapper ref={triggerRef}>
        <Container ref={sectionRef} style={{ width: `${events.length * 100}%` }}>
          {events.map((event, index) => (
            <Panel key={index}>
              <Year>{event.year}</Year>
              <Content>
                <TextReveal>
                  <Title>{event.title}</Title>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <Desc>{event.desc}</Desc>
                </TextReveal>
              </Content>
            </Panel>
          ))}
        </Container>
      </SectionWrapper>
    </div>
  );
};

export default HorizontalScroll;
