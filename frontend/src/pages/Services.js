import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import api from '../utils/api';
import Loading from '../components/Loading';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedDescription = (text, limit) => {
    if (!text) return "";
    let processed = text;
    if (limit && text.length > limit) {
      processed = text.substring(0, limit).trim() + "...";
    }

    const boldContents = [];
    const BOLD_PH = "___BOLD_PH___";
    const shieldedText = processed.replace(/\*\*.*?\*\*/g, (match) => {
      boldContents.push(match);
      return `${BOLD_PH}${boldContents.length - 1}${BOLD_PH}`;
    });

    const segments = shieldedText.split(/\*|-/);

    return segments.map((seg, idx) => {
      let content = seg.trim();
      if (!content && idx === 0) return null;

      const restored = content
        .split(new RegExp(`(${BOLD_PH}\\d+${BOLD_PH})`, "g"))
        .map((part, pIdx) => {
          if (part.startsWith(BOLD_PH)) {
            const index = parseInt(part.replace(new RegExp(BOLD_PH, "g"), ""));
            const rawBold = boldContents[index];
            return (
              <strong key={pIdx} className="fw-bold">
                {rawBold.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

      if (idx === 0 && !processed.startsWith("*") && !processed.startsWith("-")) {
        return (
          <div key={idx} className="mb-2">
            {restored}
          </div>
        );
      }

      return (
        <div key={idx} className="d-flex mb-1 align-items-start">
          <span className="me-2 text-dark" style={{ fontSize: "1.4rem", lineHeight: "1" }}>
            •
          </span>
          <span>{restored}</span>
        </div>
      );
    });
  };

  return (
    <>
      <Helmet>
        <title>Our Services - CA Consultancy</title>
        <meta name="description" content="Comprehensive CA services including Audit & Assurance, Tax, GST, ROC Compliance, and Financial Consulting." />
      </Helmet>

      {/* Services Hero Banner */}
      <section 
        className="position-relative d-flex align-items-center responsive-hero-section"
        style={{
           // Professional Business Background
           backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
           backgroundSize: "cover",
           backgroundPosition: "center",
           minHeight: "50vh", // Increased height for better image visibility
           marginTop: "-76px",
           color: "white"
        }}
      >
         {/* Neutral Dark Overlay (Not too Blue) */}
         <div 
            className="position-absolute top-0 start-0 w-100 h-100" 
            style={{ 
                backgroundColor: "rgba(0, 0, 0, 0.6)", // Neutral black overlay, 60% opacity for text contrast + image visibility
                zIndex: 1 
            }}
         ></div>

         <Container className="position-relative" style={{ zIndex: 2 }}>
             <Row className="align-items-center justify-content-center">
                 <Col md={10} className="fade-in-up text-center">
                     {/* Tag Removed */}
                     <h1 className="display-3 fw-bold mb-3 font-heading fade-in-up delay-1" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>
                        Our Professional Services
                     </h1>
                     <p className="lead opacity-100 mb-4 fade-in-up delay-2 mx-auto" style={{ maxWidth: "800px", fontWeight: "400", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                        From statutory audits to complex taxation and regulatory compliance, we provide reliable, ethical, and strategic professional services tailored to client needs.
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
          ) : services.length > 0 ? (
            <Row className="g-4">
              {services.map((service, index) => (
                <Col md={6} lg={4} key={service._id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card 
                    as={Link}
                    to={`/services/${service.slug}`}
                    className="h-100 text-decoration-none border-0 shadow-sm"
                    style={{ 
                        backgroundColor: "white",
                        borderTop: "3px solid #D4AF37", // Matching Home Page Style
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        display: "block" // Ensure Link behaves as block
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
                    <div className="overflow-hidden position-relative" style={{ height: "200px" }}>
                        {service.imageURL ? (
                             <Card.Img 
                                variant="top" 
                                src={service.imageURL} 
                                className="h-100 w-100 object-fit-cover" 
                                alt={service.title}
                            />
                        ) : (
                             <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light">
                                <i className="fas fa-briefcase fa-3x text-muted opacity-25"></i>
                            </div>
                        )}
                         <div className="position-absolute top-0 start-0 w-100 h-100" 
                             style={{ background: "linear-gradient(to top, rgba(0,33,71,0.6), transparent)", opacity: 0.4 }}></div>
                    </div>
                    
                    <Card.Body className="p-3 d-flex flex-column">
                      <h3 className="h5 fw-bold mb-2" style={{ color: "#002147", fontFamily: "var(--font-heading)" }}>
                        {service.title}
                      </h3>
                      <div className="text-secondary mb-3 flex-grow-1" style={{ 
                        fontSize: "0.85rem", 
                        lineHeight: "1.5",
                        display: "-webkit-box",
                        WebkitLineClamp: "1",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                        {renderFormattedDescription(service.description, 40)}
                      </div>
                      <div className="mt-auto pt-2 border-top border-light">
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
              <p className="text-muted">No services available yet.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default Services;
