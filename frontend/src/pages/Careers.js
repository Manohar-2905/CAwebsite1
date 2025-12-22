import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import api from '../utils/api';
import Loading from '../components/Loading';

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await api.get('/careers');
      setCareers(response.data);
    } catch (error) {
      console.error('Error fetching careers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Careers - DASGUPTA MAITI & ASSOCIATES</title>
        <meta name="description" content="Explore career opportunities with us. Join our team of professionals." />
      </Helmet>

      {/* Hero Section - Corporate Style */}
       <section 
        className="d-flex align-items-center justify-content-center text-center text-white"
        style={{ 
          paddingTop: "100px",
          paddingBottom: "100px",
          background: "linear-gradient(135deg, #002147 0%, #00152e 100%)",
          position: "relative"
        }}
      >
        <Container style={{ zIndex: 2 }}>
            <h1 className="display-4 fw-bold mb-3 font-heading fade-in-up">
               Your Future Starts Here.
            </h1>
            <p className="lead opacity-75 mb-0 mx-auto fade-in-up delay-1" style={{ maxWidth: "700px" }}>
                Join a team where excellence is a habit and integrity is the foundation. 
                We are looking for passionate professionals to drive impact.
            </p>
        </Container>
      </section>


      {/* Why Join Us - 3 Column Feature */}
      <section className="section-padding bg-white">
        <Container>
            <div className="text-center mb-5 fade-in-up">
                 <h2 className="fw-bold" style={{ color: "#002147", fontFamily: "var(--font-heading)" }}>Why Join Us?</h2>
                 <div className="mx-auto mt-3" style={{ height: "3px", width: "50px", backgroundColor: "#D4AF37" }}></div>
            </div>
            
            <Row className="text-center g-4">
                <Col md={4} className="fade-in-up delay-1">
                    <div className="p-4">
                        <div className="mb-3 mx-auto d-flex align-items-center justify-content-center rounded-circle" style={{ width: "70px", height: "70px", backgroundColor: "#FDF8E4", color: "#D4AF37" }}>
                            <i className="fas fa-chart-line fa-2x"></i>
                        </div>
                        <h4 className="fw-bold mb-3" style={{ color: "#002147" }}>Professional Exposure</h4>
                        <p className="text-muted">
                            Practical learning through real client assignments under senior professionals.
                        </p>
                    </div>
                </Col>
                <Col md={4} className="fade-in-up delay-2">
                     <div className="p-4">
                        <div className="mb-3 mx-auto d-flex align-items-center justify-content-center rounded-circle" style={{ width: "70px", height: "70px", backgroundColor: "#E6EAED", color: "#002147" }}>
                            <i className="fas fa-users fa-2x"></i>
                        </div>
                        <h4 className="fw-bold mb-3" style={{ color: "#002147" }}>Collaborative Culture</h4>
                        <p className="text-muted">
                           A respectful and ethical workplace that values teamwork and accountability.
                        </p>
                     </div>
                </Col>
                <Col md={4} className="fade-in-up delay-3">
                     <div className="p-4">
                        <div className="mb-3 mx-auto d-flex align-items-center justify-content-center rounded-circle" style={{ width: "70px", height: "70px", backgroundColor: "#FDF8E4", color: "#D4AF37" }}>
                            <i className="fas fa-leaf fa-2x"></i>
                        </div>
                        <h4 className="fw-bold mb-3" style={{ color: "#002147" }}>Sustainable Growth</h4>
                        <p className="text-muted">
                            A balanced professional environment supporting long-term career development.
                        </p>
                     </div>
                </Col>
            </Row>
        </Container>
      </section>

      {/* Current Openings - List View */}
      <section className="section-padding" style={{ backgroundColor: "#F9FAFB" }}>
        <Container>
            <div className="mb-5 fade-in-up">
                 <h2 className="fw-bold mb-4" style={{ color: "#002147", fontFamily: "var(--font-heading)" }}>Current Openings</h2>
            </div>

          {loading ? (
             <Loading message="Loading positions..." />
          ) : careers.length > 0 ? (
            <div className="bg-white rounded-3 shadow-sm overflow-hidden fade-in-up">
                {careers.map((career, index) => (
                    <div 
                        key={career._id} 
                        className="p-4 border-bottom position-relative job-row"
                        style={{ 
                            transition: "background-color 0.2s ease" 
                        }}
                    >
                        <Row className="align-items-center">
                            <Col md={5} className="mb-3 mb-md-0">
                                <h5 className="fw-bold mb-1" style={{ color: "#002147" }}>
                                    <Link to={`/careers/${career.slug}`} className="text-decoration-none stretched-link" style={{ color: "inherit" }}>
                                        {career.title}
                                    </Link>
                                </h5>
                                {career.department && (
                                    <span className="text-muted small text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.75rem" }}>
                                        {career.department}
                                    </span>
                                )}
                            </Col>
                            <Col md={3} className="mb-2 mb-md-0">
                                {career.location && (
                                     <div className="text-secondary small">
                                        <i className="fas fa-map-marker-alt me-2 text-warning"></i>{career.location}
                                     </div>
                                )}
                            </Col>
                            <Col md={2} className="mb-2 mb-md-0">
                                {career.type && (
                                     <span className="badge rounded-pill fw-normal px-3 py-1" style={{ backgroundColor: "#F3F4F6", color: "#4B5563" }}>
                                        {career.type}
                                    </span>
                                )}
                            </Col>
                            <Col md={2} className="text-md-end">
                                <span className="btn btn-link text-decoration-none p-0 fw-bold" style={{ color: "#D4AF37", fontSize: "0.9rem" }}>
                                    View Role <i className="fas fa-chevron-right ms-1"></i>
                                </span>
                            </Col>
                        </Row>
                    </div>
                ))}
            </div>
          ) : (
             <div className="text-center py-5 bg-white shadow-sm rounded-3">
                 <i className="far fa-folder-open fa-3x mb-3 text-muted opacity-50"></i>
                 <p className="text-muted mb-0">No current openings. Please check back later.</p>
             </div>
          )}
        </Container>
      </section>

      <style jsx>{`
        .job-row:hover {
            background-color: #F8F9FA;
        }
        .job-row:hover .btn-link {
             text-decoration: underline !important;
        }
      `}</style>
    </>
  );
};

export default Careers;
