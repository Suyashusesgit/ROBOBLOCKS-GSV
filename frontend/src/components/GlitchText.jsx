import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const glitchAnim = keyframes`
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
`;

const GlitchWrapper = styled.div`
  position: relative;
  display: inline-block;
  color: #fff;
  
  ${props => props.isGlitching && css`
    animation: ${glitchAnim} 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    
    &:before, &:after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    &:before {
      left: 2px;
      text-shadow: -1px 0 #ff00c1;
      clip: rect(44px, 450px, 56px, 0);
      animation: ${glitchAnim} 5s infinite linear alternate-reverse;
    }
    
    &:after {
      left: -2px;
      text-shadow: -1px 0 #00fff9;
      clip: rect(44px, 450px, 56px, 0);
      animation: ${glitchAnim} 5s infinite linear alternate-reverse;
    }
  `}
`;

const GlitchText = ({ children, as = 'span', className }) => {
    const [isGlitching, setIsGlitching] = useState(false);

    const triggerGlitch = () => {
        if (!isGlitching) {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 300);
        }
    };

    useEffect(() => {
        // Random auto-glitch
        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                triggerGlitch();
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <GlitchWrapper
            as={as}
            className={className}
            data-text={children}
            isGlitching={isGlitching}
            onMouseEnter={triggerGlitch}
        >
            {children}
        </GlitchWrapper>
    );
};

export default GlitchText;
