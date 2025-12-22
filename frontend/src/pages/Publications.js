import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import api from '../utils/api';
import Loading from '../components/Loading';

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await api.get('/publications');
      setPublications(response.data);
    } catch (error) {
      console.error('Error fetching publications:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseBoldText = (text) => {
    if (!text) return text;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const navigate = useNavigate();

  /* Removed unused handleDownload and handleView functions */

  return (
    <>
      <Helmet>
        <title>Publications - CA Consultancy</title>
        <meta name="description" content="Browse our latest publications, insights, and industry updates." />
      </Helmet>

      {/* Hero Banner (Matching Services Style) */}
      <section 
        className="position-relative py-5 d-flex align-items-center"
        style={{
           backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop')", // Professional office/paper background
           backgroundSize: "cover",
           backgroundPosition: "center",
           minHeight: "50vh",
           marginTop: "-76px",
           paddingTop: "120px",
           color: "white"
        }}
      >
         <div 
            className="position-absolute top-0 start-0 w-100 h-100" 
            style={{ 
                backgroundColor: "rgba(0, 0, 0, 0.6)", 
                zIndex: 1 
            }}
         ></div>

         <Container className="position-relative" style={{ zIndex: 2 }}>
             <Row className="align-items-center">
                 <Col md={8}>
                      <h1 className="display-3 fw-bold mb-3 font-heading fade-in-up delay-1" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                        Insights & Publications
                     </h1>
                     <p className="lead opacity-100 mb-4 fade-in-up delay-2" style={{ maxWidth: "800px", fontWeight: "400", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                        Stay updated with our professional publications, offering timely insights on taxation, audit, compliance, and corporate regulations.
                     </p>
                 </Col>
             </Row>
         </Container>
      </section>

      <section className="section-padding bg-light">
        <Container>
          {loading ? (
             <div className="text-center py-5">
                 <div className="spinner-border" style={{ color: "#002147" }} role="status">
                    <span className="visually-hidden">Loading...</span>
                 </div>
            </div>
          ) : publications.length > 0 ? (
            <Row className="g-4">
              {publications.map((publication, index) => (
                <Col md={6} lg={4} key={publication._id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card 
                    as={Link}
                    to={`/publications/${publication.slug}`}
                    className="h-100 text-decoration-none border-0 shadow-sm"
                    style={{ 
                        backgroundColor: "white",
                        borderTop: "3px solid #D4AF37", // Matching Services Style
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        display: "block"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
                    }}
                  >
                    <div className="overflow-hidden position-relative" style={{ height: "220px" }}>
                            {publication.imageURL ? (
                                <Card.Img 
                                    variant="top" 
                                    src={publication.imageURL} 
                                    className="h-100 w-100 object-fit-cover" 
                                    alt={publication.title}
                                />
                            ) : (
                                <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light">
                                    <i className="fas fa-file-alt fa-3x text-muted opacity-25"></i>
                                </div>
                            )}
                             <div className="position-absolute top-0 start-0 w-100 h-100" 
                                 style={{ background: "linear-gradient(to top, rgba(0,33,71,0.6), transparent)", opacity: 0.4 }}></div>
                    </div>
                    
                    <Card.Body className="p-4 d-flex flex-column">
                      <h3 className="h5 fw-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                        <span className="text-decoration-none" style={{ color: "#002147" }}>
                            {publication.title}
                        </span>
                      </h3>
                      
                      <Card.Text className="text-secondary mb-4 flex-grow-1" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                        {parseBoldText(publication.description.substring(0, 120))}...
                      </Card.Text>

                      <div className="mt-auto pt-3 border-top border-light">
                        <span className="fw-bold text-uppercase" style={{ fontSize: "0.8rem", color: "#D4AF37", letterSpacing: "1px" }}>
                            Read More <i className="fas fa-arrow-right ms-1"></i>
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">No publications available yet. Check back soon!</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default Publications;
