import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = styled.section`
  min-height: 200vh;
  padding: 8rem 2rem;
  background: var(--color-bg);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 5rem;
  text-align: center;
  background: linear-gradient(to right, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 2;
`;

const TimelineContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 150px;
`;

const LineContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  z-index: 1;

  @media (max-width: 768px) {
    left: 20px;
  }
`;

const ActiveLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0%;
  background: var(--color-primary);
  box-shadow: 0 0 10px var(--color-primary);
`;

const EventCard = styled.div`
  position: relative;
  width: 45%;
  padding: 2rem;
  background: #111;
  border: 1px solid #333;
  border-radius: 12px;
  align-self: ${props => props.left ? 'flex-start' : 'flex-end'};
  z-index: 2;
  opacity: 0; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px -10px rgba(0, 240, 255, 0.3);
    border-color: var(--color-primary);
  } 
  /* Initial state handled by GSAP */

  &::before {
    content: '';
    position: absolute;
    top: 2rem;
    ${props => props.left ? 'right: -60px;' : 'left: -60px;'}
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--color-bg);
    border: 2px solid var(--color-primary);
    z-index: 3;
    
    @media (max-width: 768px) {
      left: -51px; /* Adjust based on mobile line position */
      right: auto;
    }
  }
  
  /* Connector Line */
  &::after {
    content: '';
    position: absolute;
    top: calc(2rem + 9px);
    ${props => props.left ? 'right: -40px;' : 'left: -40px;'}
    width: 40px;
    height: 2px;
    background: var(--color-border);
    
    @media (max-width: 768px) {
      left: -40px;
      right: auto;
    }
  }

  @media (max-width: 768px) {
    width: 85%;
    align-self: flex-end;
  }
`;

const DateText = styled.span`
  display: block;
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
`;

const EventDesc = styled.p`
  color: #aaa;
  line-height: 1.6;
`;

const events = [
  { date: "Phase 1", title: "Registration", desc: "Teams can start registering on the portal." },
  { date: "Phase 2", title: "Idea, Workflow & Algorithm", desc: "Submission of robot design, workflow and algorithm documentation." },
  { date: "Phase 3", title: "ROS Simulation", desc: "Simulate your bot in the provided ROS environment." },
  { date: "Phase 4", title: "Offline Round", desc: "Grand Finale with working bots at the arena." }
];

const Timeline = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = containerRef.current;

    // Animate the central line
    gsap.to(lineRef.current, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      }
    });

    // Animate each card
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%', // When top of card hits 80% of viewport
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

  }, []);

  return (
    <TimelineSection>
      <SectionTitle>Event Timeline</SectionTitle>
      <TimelineContainer ref={containerRef}>
        <LineContainer>
          <ActiveLine ref={lineRef} />
        </LineContainer>

        {events.map((event, index) => (
          <EventCard
            key={index}
            left={index % 2 === 0}
            ref={el => cardRefs.current[index] = el}
          >
            <DateText>{event.date}</DateText>
            <EventTitle>{event.title}</EventTitle>
            <EventDesc>{event.desc}</EventDesc>
          </EventCard>
        ))}
      </TimelineContainer>
    </TimelineSection>
  );
};

export default Timeline;
