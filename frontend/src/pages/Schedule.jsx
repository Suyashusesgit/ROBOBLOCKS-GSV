import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';
import TextReveal from '../components/TextReveal';
import Tilt from 'react-parallax-tilt';
import DecryptText from '../components/DecryptText';

const PageContainer = styled.div`
  min-height: 200vh;
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const TimelineWrapper = styled.div`
  position: relative;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 8rem;
`;

const SVGLineContainer = styled.div`
  position: absolute;
  top: 0;
  left: 20px;
  width: 4px;
  height: 100%;
  z-index: 0;
  
  @media (max-width: 768px) {
    left: 10px;
  }
`;

const EventCard = styled(motion.div)`
  margin-left: 60px;
  position: relative;
  background: #111;
  border: 1px solid var(--color-border);
  padding: 2rem;
  border-radius: 12px;
  overflow: hidden;

  /* Theme-specific accent */
  border-left: 4px solid var(--color-primary);

  @media (max-width: 768px) {
    margin-left: 40px;
  }
`;

const Dot = styled(motion.div)`
  position: absolute;
  left: -53px;
  top: 50%;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 2px solid var(--color-primary);
  box-shadow: 0 0 10px var(--color-primary);
  z-index: 2;

  @media (max-width: 768px) {
    left: -38px;
  }
`;

const Time = styled.h3`
  font-family: var(--font-heading);
  color: var(--color-primary);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h4`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Desc = styled.p`
  color: var(--color-text);
  line-height: 1.6;
  opacity: 0.8;
  font-family: var(--font-main);
`;

const Schedule = () => {

  // Rich Sci-Fi Lore Data
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await import('../services/teamService').then(m => m.default.getSiteContent());
        if (content && content.schedule) {
          setEvents(content.schedule);
        }
      } catch (err) {
        console.error("Failed to load Schedule", err);
      }
    };
    loadContent();
  }, []);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <PageContainer>
      <TextReveal>
        <h1><DecryptText>Mission Timeline</DecryptText></h1>
      </TextReveal>

      <TimelineWrapper ref={ref}>
        <SVGLineContainer>
          <motion.div
            style={{
              scaleY,
              transformOrigin: "top",
              width: "100%",
              height: "100%",
              background: "var(--color-primary)",
              boxShadow: "0 0 15px var(--color-primary)"
            }}
          />
        </SVGLineContainer>

        {events.map((ev, i) => (
          <EventCard
            key={i}
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.05}
              transitionSpeed={1500}
              className="tilt-card"
            >
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Dot
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                />
                <Time>{ev.time}</Time>
                <Title>{ev.title}</Title>
                <Desc>{ev.desc}</Desc>
              </div>
            </Tilt>
          </EventCard>
        ))}
      </TimelineWrapper>
    </PageContainer>
  );
};

export default Schedule;
