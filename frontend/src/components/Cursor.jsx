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
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
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
            gsap.to(ringRef.current, { scale: 1.5, duration: 0.3 });
            gsap.to(dotRef.current, { scale: 0, duration: 0.3 });
        } else {
            gsap.to(ringRef.current, { scale: 1, duration: 0.3 });
            gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
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
