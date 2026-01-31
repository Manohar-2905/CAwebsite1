import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card } from 'react-bootstrap';
import api from '../utils/api';

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

  const renderFormattedDescription = (text) => {
    if (!text) return "";

    // 1. Remove HTML tags
    let cleanText = text.replace(/<[^>]*>/g, "");

    // 2. Split by bullet points (*, -, •) or newlines
    // This allows us to reconstruct the list items
    const items = cleanText.split(/[*•\-\n]/).map(item => item.trim()).filter(item => item.length > 0);

    // 3. Take the first 3 items to keep card height consistent
    const displayItems = items.slice(0, 3);

    return (
      <div className="d-flex flex-column gap-1">
        {displayItems.map((item, idx) => (
          <div key={idx} className="d-flex align-items-start">
            <span className="me-2 text-warning" style={{ lineHeight: "1.4" }}>•</span>
            <span style={{ fontSize: "0.85rem", lineHeight: "1.4" }}>{item}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Our Services - DASGUPTA MAITI & ASSOCIATES | Audit, Tax & GST</title>
        <meta name="description" content="Expert CA services by DASGUPTA MAITI & ASSOCIATES in Kolkata. We offer Audit & Assurance, Income Tax Filing, GST Registration, ROC Compliance, and Startup Consulting." />
        <meta name="keywords" content="CA Services Kolkata, Audit & Assurance, Statutory Audit, Tax Audit, Income Tax Filing, GST Registration, GST Filing, GSTR 3B, Company Incorporation, ROC Compliance, Project Financing, MSME Registration, Startup India, NGO Audit, 12A 80G Registration, Payroll Management, Bookkeeping, Digital Signature" />
      </Helmet>

      {/* Services Hero Banner */}
      <section 
        className="position-relative d-flex align-items-center responsive-hero-section"
        style={{
           // Professional Business Background
           backgroundImage: "url('/services.jpg')",
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
                        display: "block",
                        overflow: "hidden"
                      }}>
                        {renderFormattedDescription(service.description)}
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
