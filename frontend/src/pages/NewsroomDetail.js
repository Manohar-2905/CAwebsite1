import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import api from '../utils/api';

const NewsroomDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [newsroom, setNewsroom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsroom();
  }, [slug]);

  const fetchNewsroom = async () => {
    try {
      const response = await api.get(`/newsroom/${slug}`);
      setNewsroom(response.data);
    } catch (error) {
      console.error('Error fetching newsroom:', error);
      navigate('/newsroom');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Helper function to render description with robust bullet points and bold parsing
  const renderDescription = (text) => {
    if (!text) return null;

    // Split by newlines to preserve paragraph structure
    const lines = text.split('\n');
    
    return lines.map((line, idx) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <br key={idx} />;

      // Check for list items
      const isListItem = trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*');
      const cleanLine = isListItem ? trimmedLine.substring(1).trim() : trimmedLine;

      // Handle bold formatting
      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      if (isListItem) {
        return (
          <div key={idx} className="d-flex mb-2 align-items-start" style={{ paddingLeft: "1rem" }}>
            <span className="me-2 text-warning" style={{ fontSize: "1.2rem", lineHeight: "1.5" }}>•</span>
            <span>{renderedParts}</span>
          </div>
        );
      }

      return (
        <p key={idx} style={{ marginBottom: "1rem" }}>
          {renderedParts}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <Container className="text-center py-5" style={{ marginTop: "100px" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!newsroom) {
    return null;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: newsroom.title,
    description: newsroom.description,
    datePublished: newsroom.date,
    author: {
      '@type': 'Organization',
      name: 'DASGUPTA MAITI & ASSOCIATES'
    }
  };

  return (
    <>
      <Helmet>
        <title>{newsroom.title} - DASGUPTA MAITI & ASSOCIATES</title>
        <meta name="description" content={newsroom.description ? newsroom.description.substring(0, 160) : ''} />
        <meta name="keywords" content={newsroom.keywords ? newsroom.keywords.join(', ') : ''} />
        <meta property="og:title" content={newsroom.title} />
        <meta property="og:description" content={newsroom.description ? newsroom.description.substring(0, 160) : ''} />
        {newsroom.imageURL && <meta property="og:image" content={newsroom.imageURL} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="py-4 bg-light shadow-sm" style={{ marginTop: "0" }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              {/* Breadcrumb / Back Link */}
              <Link to="/newsroom" className="text-decoration-none text-muted small fw-bold mb-3 d-block">
                <i className="fas fa-arrow-left me-2"></i> All News
              </Link>

              {/* Simple Clean Header */}
              <div className="d-flex align-items-end justify-content-between mb-4 flex-wrap gap-3">
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-start w-100">
                       <div>
                            <span className="text-muted small fw-bold mb-2 d-block text-uppercase" style={{ letterSpacing: '1px' }}>
                                {formatDate(newsroom.date)}
                            </span>
                            <h1 className="display-5 fw-bold font-heading mb-2" style={{ color: "#002147" }}>{newsroom.title}</h1>
                            <div style={{ height: "3px", width: "60px", background: "#D4AF37" }}></div>
                       </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding bg-white pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} className="fade-in-up delay-1">
              <div id="news-content" className="p-4 bg-white">
                {newsroom.imageURL && (
                  <img
                    src={newsroom.imageURL}
                    alt={newsroom.title}
                    className="img-fluid rounded mb-5 shadow-sm"
                    style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }}
                  />
                )}

                <div
                  className="news-description text-secondary"
                  style={{ 
                    fontSize: "1.1rem", 
                    lineHeight: "1.8", 
                    wordWrap: "break-word", 
                    overflowWrap: "break-word" 
                  }}
                >
                  {renderDescription(newsroom.content || newsroom.description)}
                </div>

                <div className="mt-5 pt-4 border-top d-print-none text-center">
                   <p className="text-muted small mb-0">
                     DASGUPTA MAITI & ASSOCIATES • Newsroom
                   </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default NewsroomDetail;
