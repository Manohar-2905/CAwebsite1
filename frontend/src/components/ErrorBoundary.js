import React from 'react';
import { Container, Button } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

const ErrorFallback = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <Container className="text-center py-5">
      <div className="error-page">
        <h1 className="display-1 text-primary">500</h1>
        <h2 className="mb-4">Something went wrong</h2>
        <p className="text-muted mb-4">
          We're sorry, but something unexpected happened. Please try again later.
        </p>
        <Button variant="primary" onClick={handleGoHome} className="btn-custom">
          Go to Homepage
        </Button>
      </div>
    </Container>
  );
};

export default ErrorBoundary;
