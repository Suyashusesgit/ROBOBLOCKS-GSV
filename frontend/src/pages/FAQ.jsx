import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TextReveal from '../components/TextReveal';

const PageContainer = styled.div`
  padding: 8rem 2rem;
  min-height: 100vh;
  max-width: 900px;
  margin: 0 auto;
`;

const FAQGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 4rem;
`;

const FAQItem = styled(motion.div)`
  border: 1px solid var(--color-border);
  background: var(--color-glass);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  &[data-active="true"] {
    border-color: var(--color-primary);
    box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
  }

  /* Tech corners */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid var(--color-primary);
    border-left: 2px solid var(--color-primary);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &[data-active="true"]::before { opacity: 1; }
`;

const Question = styled.button`
  width: 100%;
  text-align: left;
  padding: 2rem;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255,255,255,0.02);
    padding-left: 2.5rem; /* Slide effect */
  }

  span {
    color: var(--color-secondary);
    font-size: 1.5rem;
  }
`;

const Answer = styled(motion.div)`
  padding: 0 2rem 2rem 2rem;
  color: #ccc;
  line-height: 1.8;
  border-top: 1px solid transparent;
  
  &[data-active="true"] {
    border-top-color: var(--color-border);
  }
`;

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const questions = [
        { q: "INIT_PARAMETER: PARTICIPATION_CRITERIA", a: "Target demographic: Students aged 14-22. Status: High School or Undergraduate. Verification required." },
        { q: "UNIT_CONFIGURATION: SQUAD_SIZE", a: "Squad limits: Min 3 / Max 5 units per team. Cross-institutional protocols are enabled and encouraged." },
        { q: "RESOURCE_ALLOCATION: ENTRY_FEE", a: "Processing fee: $50 credits per team. Includes standard hardware kit and mainframe access credentials." },
        { q: "HARDWARE_SPECS: BYOD_POLICY", a: "Basic toolsets provided on-site. Custom hardware modules and processing units (Laptops) must be provisioned by the team." },
        { q: "LOGISTICS: ACCOMMODATION", a: "Dormitory access provided for out-of-sector teams. Request via portal utilizing Form-7B." }
    ];

    return (
        <PageContainer>
            <TextReveal>
                <h1>Knowledge Base</h1>
            </TextReveal>

            <FAQGrid>
                {questions.map((item, idx) => (
                    <FAQItem
                        key={idx}
                        data-active={activeIndex === idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Question onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}>
                            {item.q}
                            <motion.span
                                animate={{ rotate: activeIndex === idx ? 45 : 0 }}
                            >
                                +
                            </motion.span>
                        </Question>
                        <AnimatePresence>
                            {activeIndex === idx && (
                                <Answer
                                    data-active={true}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                >
                                    {item.a}
                                </Answer>
                            )}
                        </AnimatePresence>
                    </FAQItem>
                ))}
            </FAQGrid>
        </PageContainer>
    );
};

export default FAQ;
