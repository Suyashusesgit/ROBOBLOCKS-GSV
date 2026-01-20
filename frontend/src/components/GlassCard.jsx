import styled from 'styled-components';
import { motion } from 'framer-motion';

const GlassCard = styled(motion.div)`
  background: rgba(17, 17, 17, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--color-primary);
    box-shadow: 0 8px 32px 0 rgba(0, 240, 255, 0.1);
  }
`;

export default GlassCard;
