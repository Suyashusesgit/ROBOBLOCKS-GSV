import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const CardContainer = styled(motion.div)`
  perspective: 1000px;
  transform-style: preserve-3d;
  height: 100%;
`;

const CardBody = styled.div`
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  will-change: transform;
`;

const TiltCard = ({ children, className }) => {
    const ref = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotateX(rotateX);
        setRotateY(rotateY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <CardContainer
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <CardBody style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}>
                {children}
            </CardBody>
        </CardContainer>
    );
};

export default TiltCard;
