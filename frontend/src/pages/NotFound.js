import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | CA Consultancy</title>
      </Helmet>
      <Container className="text-center py-5">
        <div className="not-found-page fade-in-up">
          <h1 className="display-1 text-primary fw-bold">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="text-muted mb-4 lead">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Button as={Link} to="/" variant="primary" size="lg">
              Go to Homepage
            </Button>
            <Button as={Link} to="/services" variant="outline-primary" size="lg">
              Browse Services
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
