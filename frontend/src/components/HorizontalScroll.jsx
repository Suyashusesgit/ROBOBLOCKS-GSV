import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Container = styled.div`
  width: 300%; /* 3 full screen widths */
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden; /* Hide overflow to allow pinning */
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
`;

const Year = styled.h2`
  font-size: 8rem;
  color: rgba(255, 255, 255, 0.05); // Subtle background text
  position: absolute;
  top: 10%;
  left: 5%;
  font-family: var(--font-heading);
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

const HorizontalScroll = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const pin = gsap.fromTo(
            sectionRef.current,
            {
                translateX: 0,
            },
            {
                translateX: "-200vw", // Move by 2 screen widths (total 3 panels)
                ease: "none",
                duration: 1,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=2000", // Scroll distance
                    scrub: 0.6,
                    pin: true,
                },
            }
        );
        return () => {
            pin.kill();
        };
    }, []);

    return (
        <SectionWrapper ref={triggerRef}>
            <Container ref={sectionRef}>
                {events.map((event, index) => (
                    <Panel key={index}>
                        <Year>{event.year}</Year>
                        <Content>
                            <Title>{event.title}</Title>
                            <Desc>{event.desc}</Desc>
                        </Content>
                    </Panel>
                ))}
            </Container>
        </SectionWrapper>
    );
};

export default HorizontalScroll;
