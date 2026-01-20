import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext, themes } from '../context/ThemeContext';

const SwitcherContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
`;

const ToggleButton = styled.button`
  background: #111;
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  padding: 0.8rem;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    background: var(--color-primary);
    color: var(--color-bg);
  }
`;

const ThemeList = styled(motion.div)`
  background: #111;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ThemeOption = styled.button`
  background: ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-bg)' : 'var(--color-text)'};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-align: right;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'};
  }
`;

const ThemeSwitcher = () => {
    const { currentTheme, switchTheme } = useContext(ThemeContext);
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <SwitcherContainer>
            <AnimatePresence>
                {isOpen && (
                    <ThemeList
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    >
                        {Object.keys(themes).map((t) => (
                            <ThemeOption
                                key={t}
                                active={currentTheme === t}
                                onClick={() => {
                                    switchTheme(t);
                                    setIsOpen(false);
                                }}
                            >
                                {t.charAt(0).toUpperCase() + t.slice(1)}
                            </ThemeOption>
                        ))}
                    </ThemeList>
                )}
            </AnimatePresence>
            <ToggleButton onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Themes">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
            </ToggleButton>
        </SwitcherContainer>
    );
};

export default ThemeSwitcher;
