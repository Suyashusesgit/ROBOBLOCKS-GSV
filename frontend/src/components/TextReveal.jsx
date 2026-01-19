import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  display: inline-block;
`;

const TextReveal = ({ children, delay = 0, className }) => {
    // Split text into words or characters? Simple reveal for now.
    // For a more advanced reveal, we can split characters. 
    // Let's do a simple vertical slide-up reveal which is very "cinematic".

    const variants = {
        hidden: { y: "110%", opacity: 0, rotate: 5 },
        visible: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1], // Cubic bezier for premium feel
                delay: delay
            }
        }
    };

    return (
        <Wrapper className={className}>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={variants}
            >
                {children}
            </motion.div>
        </Wrapper>
    );
};

export default TextReveal;
