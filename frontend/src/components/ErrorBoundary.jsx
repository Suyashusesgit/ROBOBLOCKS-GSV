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
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Critical System Failure:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <GlitchText>System Malfunction</GlitchText>
          <p>Critical error detected in neural interface.</p>
          <div style={{ padding: '1rem', color: '#ff003c', textAlign: 'left', maxWidth: '800px', overflow: 'auto' }}>
            <h3>Diagnostics:</h3>
            <pre>{this.state.error?.toString()}</pre>
            <pre style={{ fontSize: '0.8rem' }}>{this.state.errorInfo?.componentStack}</pre>
          </div>
          <RetryButton onClick={() => window.location.reload()}>Reboot System</RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
