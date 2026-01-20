import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledDecrypt = styled.span`
  display: inline-block;
  font-family: var(--font-heading);
  white-space: pre-wrap;
  position: relative;
`;

const DecryptText = ({ children, time = 2000, className }) => {
    const [displayText, setDisplayText] = useState('');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    useEffect(() => {
        let isMounted = true;
        let iteration = 0;
        const targetText = children || "";

        const interval = setInterval(() => {
            if (!isMounted) return;

            setDisplayText(targetText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return targetText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("")
            );

            if (iteration >= targetText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3; // Speed of decoding
        }, 30);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [children]);

    return <StyledDecrypt className={className}>{displayText}</StyledDecrypt>;
};

export default DecryptText;
