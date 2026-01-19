import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import TextReveal from '../components/TextReveal';

const PageContainer = styled.div`
  background-color: var(--color-bg);
  min-height: 200vh; /* Allow scrolling */
  perspective: 1200px; /* For 3D depth */
  overflow: hidden;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 5rem;
  left: 0;
  width: 100%;
  text-align: center;
  z-index: 10;
  pointer-events: none;
  mix-blend-mode: difference;
`;

const GalleryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15vh;
  padding: 20vh 0;
  align-items: center;
  transform-style: preserve-3d;
`;

const ImageWrapper = styled(motion.div)`
  width: 60vw;
  height: 40vw;
  max-width: 800px;
  max-height: 500px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  border: 1px solid var(--color-border);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    scale: 1.2; /* To allow parallax movement inside */
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 100px rgba(0,0,0,0.5);
    pointer-events: none;
  }
`;

const ParallaxImage = ({ src, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // 3D Transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Smooth spring physics
  const smoothRotateX = useSpring(rotateX, { damping: 15, stiffness: 100 });

  return (
    <ImageWrapper
      ref={ref}
      style={{
        rotateX: smoothRotateX,
        scale,
        opacity
      }}
    >
      <img src={src} alt="Gallery Item" />
    </ImageWrapper>
  );
};

const Gallery = () => {
  // High-res placeholder visuals (Cyberpunk/Robotics themes)
  const images = [
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    "https://images.unsplash.com/photo-1535378437323-9555f3e7f667?w=800&q=80",
    "https://images.unsplash.com/photo-1518674660708-312141344184?w=800&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
  ];

  return (
    <PageContainer>
      <HeaderWrapper>
        <TextReveal>
          <h1 style={{ fontSize: '4rem', textShadow: '0 0 20px var(--color-primary)' }}>
            VISUAL LOGS
          </h1>
        </TextReveal>
      </HeaderWrapper>

      <GalleryGrid>
        {images.map((src, i) => (
          <ParallaxImage key={i} src={src} index={i} />
        ))}
      </GalleryGrid>
    </PageContainer>
  );
};

export default Gallery;
