import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Courier New', monospace;
  color: #0f0;
  overflow: hidden;
`;

const TerminalText = styled.div`
  max-width: 600px;
  width: 90%;
  font-size: 1.2rem;
  line-height: 1.5;
  
  p {
    margin: 5px 0;
    opacity: 0.8;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 1.2rem;
  background: #0f0;
  animation: ${blink} 1s infinite;
  vertical-align: middle;
  margin-left: 5px;
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 4px;
  background: #333;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: #0f0;
    transition: width 0.1s linear;
  }
`;

const bootSequence = [
    "INITIALIZING ROBOBLOCKS KERNEL v4.0...",
    "LOADING MODULES: [GRAPHICS, PHYSICS, AUDIO]...",
    "ESTABLISHING SECURE CONNECTION...",
    "DECRYPTING ASSETS...",
    "ACCESS GRANTED."
];

const Preloader = ({ onComplete }) => {
    const [lines, setLines] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentLine = 0;

        // Line typing simulation
        const lineInterval = setInterval(() => {
            if (currentLine < bootSequence.length) {
                setLines(prev => [...prev, bootSequence[currentLine]]);
                currentLine++;
            } else {
                clearInterval(lineInterval);
                setTimeout(onComplete, 800); // Finish after last line
            }
        }, 600);

        // Progress bar simulation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 5;
            });
        }, 100);

        return () => {
            clearInterval(lineInterval);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <Container>
            <TerminalText>
                {lines.map((line, i) => (
                    <p key={i}>&gt; {line}</p>
                ))}
                {lines.length < bootSequence.length && <p>&gt; <Cursor /></p>}
            </TerminalText>
            <ProgressBar progress={progress} />
        </Container>
    );
};

export default Preloader;
