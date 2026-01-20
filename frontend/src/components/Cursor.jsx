import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const CursorWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
`;

const CursorDot = styled.div`
  width: 20px;
  height: 20px;
  background: transparent;
  border-left: 2px solid white;
  border-right: 2px solid white;
  position: absolute;
  transform: translate(-50%, -50%);
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: -50%;
    width: 200%;
    height: 2px;
    background: white;
    transform: translateY(-50%);
  }
`;

const CursorRing = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid white;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  opacity: 0.6;
`;

const Cursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        // Initial position
        gsap.set(dotRef.current, { xPercent: -50, yPercent: -50 });
        gsap.set(ringRef.current, { xPercent: -50, yPercent: -50 });

        const moveCursor = (e) => {
            gsap.to(dotRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });
            gsap.to(ringRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out',
            });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setHovered(true);
            } else {
                setHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    useEffect(() => {
        if (hovered) {
            gsap.to(ringRef.current, { scale: 1.5, opacity: 1, borderColor: '#0f0', duration: 0.3 });
            gsap.to(dotRef.current, { rotation: 45, scale: 1.2, borderColor: '#0f0', duration: 0.3 });
            // Add a "locked on" text if you wanted, but keeping it visual for now
        } else {
            gsap.to(ringRef.current, { scale: 1, opacity: 0.3, borderColor: '#fff', duration: 0.3 });
            gsap.to(dotRef.current, { rotation: 0, scale: 1, borderColor: '#fff', duration: 0.3 });
        }
    }, [hovered]);

    return (
        <CursorWrapper>
            <CursorDot ref={dotRef} />
            <CursorRing ref={ringRef} />
        </CursorWrapper>
    );
};

export default Cursor;
