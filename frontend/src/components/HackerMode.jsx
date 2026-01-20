import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useSound } from '../context/SoundContext';

const HackerStyle = createGlobalStyle`
  :root {
    --color-bg: #000;
    --color-primary: #0f0;
    --color-secondary: #0a0;
    --color-text: #0f0;
    --font-heading: 'Courier New', monospace;
    --font-main: 'Courier New', monospace;
  }

  body {
    background-color: #000;
    color: #0f0 !important;
    text-shadow: 0 0 5px #0f0;
  }

  * {
    border-color: #0f0 !important;
    box-shadow: none !important;
  }
  
  h1, h2, h3, h4, h5, h6, p, span, div, a, button {
      font-family: 'Courier New', monospace !important;
      letter-spacing: 0 !important;
      text-transform: uppercase;
  }
`;

const CrtOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.8;
  animation: flicker 0.15s infinite;

  @keyframes flicker {
      0% { opacity: 0.85; }
      50% { opacity: 0.9; }
      100% { opacity: 0.85; }
  }
`;

const TerminalMessage = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #000;
    border: 2px solid #0f0;
    padding: 2rem;
    color: #0f0;
    font-family: monospace;
    z-index: 10000;
    text-align: center;
`;

const HackerMode = () => {
    const [enabled, setEnabled] = useState(false);
    const [keys, setKeys] = useState([]);
    const { playSuccess } = useSound();

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    useEffect(() => {
        const handleKeyDown = (e) => {
            setKeys((prev) => {
                const newKeys = [...prev, e.key];
                if (newKeys.length > konamiCode.length) {
                    newKeys.shift();
                }
                return newKeys;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (keys.join('') === konamiCode.join('')) {
            setEnabled(prev => !prev);
            playSuccess();
            setKeys([]);
        }
    }, [keys, playSuccess]);

    if (!enabled) return null;

    return (
        <>
            <HackerStyle />
            <CrtOverlay />
            <TerminalMessage>
                SYSTEM BREACH DETECTED<br />
                ACCESS GRANTED<br />
                WELCOME TO THE MATRIX
            </TerminalMessage>
        </>
    );
};

export default HackerMode;
