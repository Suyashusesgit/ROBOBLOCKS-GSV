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
  background: #00f3ff;
  position: absolute;
  transform: translate(-50%, -50%) rotate(45deg);
  box-shadow: 0 0 10px #00f3ff, 0 0 20px #00f3ff;
  
  /* Diamond Shape */
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

  /* Crosshair lines */
  &::before, &::after {
    content: '';
    position: absolute;
    background: rgba(0, 243, 255, 0.5);
    z-index: -1;
  }

  &::before {
    top: 50%;
    left: -200%;
    width: 500%;
    height: 1px;
    transform: translateY(-50%);
  }

  &::after {
    left: 50%;
    top: -200%;
    height: 500%;
    width: 1px;
    transform: translateX(-50%);
  }
`;

const CursorRing = styled.div`
  width: 40px;
  height: 40px;
  border: 1px dashed rgba(0, 243, 255, 0.5);
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid transparent;
    border-top-color: #00f3ff;
    border-bottom-color: #00f3ff;
    animation: spin 4s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Cursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const [clicking, setClicking] = useState(false);

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
                duration: 0.35,
                ease: 'power2.out',
            });
        };

        const handleMouseOver = (e) => {
            try {
                const target = e.target;
                if (!target) return;

                const isClickable =
                    target.tagName === 'A' ||
                    target.tagName === 'BUTTON' ||
                    target.closest('a') ||
                    target.closest('button') ||
                    target.closest('[role="button"]') ||
                    target.classList.contains('clickable');

                setHovered(!!isClickable);
            } catch (err) {
                // Ignore cursor errors to prevent app crash
            }
        };

        const handleMouseDown = () => setClicking(true);
        const handleMouseUp = () => setClicking(false);

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    useEffect(() => {
        if (hovered) {
            gsap.to(ringRef.current, {
                scale: 1.5,
                backgroundColor: 'rgba(0, 243, 255, 0.1)',
                borderColor: '#00f3ff',
                borderStyle: 'solid',
                duration: 0.3
            });
            gsap.to(dotRef.current, {
                scale: 0.5,
                duration: 0.3
            });
        } else {
            gsap.to(ringRef.current, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(0, 243, 255, 0.5)',
                borderStyle: 'dashed',
                duration: 0.3
            });
            gsap.to(dotRef.current, {
                scale: 1,
                duration: 0.3
            });
        }
    }, [hovered]);

    useEffect(() => {
        if (clicking) {
            gsap.to(ringRef.current, { scale: 0.8, duration: 0.1 });
            gsap.to(dotRef.current, { scale: 1.5, duration: 0.1 });
        } else {
            gsap.to(ringRef.current, { scale: hovered ? 1.5 : 1, duration: 0.2 });
            gsap.to(dotRef.current, { scale: hovered ? 0.5 : 1, duration: 0.2 });
        }
    }, [clicking, hovered]);

    return (
        <CursorWrapper>
            <CursorRing ref={ringRef} />
            <CursorDot ref={dotRef} />
        </CursorWrapper>
    );
};

export default Cursor;
