import DecryptText from "../components/DecryptText";
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
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
  background: #000;
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
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const loadContent = async () => {
      try {
        const content = await import('../services/teamService').then(m => m.default.getSiteContent());
        if (content && content.gallery) {
          // Extract URLs from gallery objects
          setImages(content.gallery.map(g => g.url));
        }
      } catch (err) {
        console.error("Failed to load Gallery", err);
      }
    };
    loadContent();
  }, []);

  return (
    <PageContainer>
      <HeaderWrapper>
        <TextReveal>
          <h1 style={{ fontSize: '4rem', textShadow: '0 0 20px var(--color-primary)' }}>
            <DecryptText>VISUAL LOGS</DecryptText>
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
