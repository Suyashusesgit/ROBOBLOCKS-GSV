import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Wipe = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--color-primary);
  z-index: 9999;
  transform-origin: left;
`;

const WipeSecondary = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--color-secondary);
  z-index: 9998;
  transform-origin: left;
`;

const PageTransition = ({ children }) => {
    return (
        <>
            <Wipe
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                exit={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: "circOut" }}
            />
            <WipeSecondary
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                exit={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: "circOut" }}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {children}
            </motion.div>
        </>
    );
};

export default PageTransition;
