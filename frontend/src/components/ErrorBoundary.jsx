import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000;
  color: #ff003c;
  text-align: center;
  font-family: 'Courier New', monospace;
`;

const GlitchText = styled.h1`
  font-size: 3rem;
  text-transform: uppercase;
  text-shadow: 2px 2px #0ff;
  margin-bottom: 2rem;
`;

const RetryButton = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  border: 1px solid #ff003c;
  color: #ff003c;
  font-size: 1.2rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s;

  &:hover {
    background: #ff003c;
    color: #000;
  }
`;

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Critical System Failure:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorContainer>
                    <GlitchText>System Malfunction</GlitchText>
                    <p>Critical error detected in neural interface.</p>
                    <RetryButton onClick={() => window.location.reload()}>Reboot System</RetryButton>
                </ErrorContainer>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
