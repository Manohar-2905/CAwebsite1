import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card } from 'react-bootstrap';
import api from '../utils/api';
import Loading from '../components/Loading';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

const Sectors = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      const response = await api.get('/sectors');
      if (response.data && response.data.length > 0) {
        setSectors(response.data);
      } else {
        setSectors([]);
      }
    } catch (error) {
      console.error('Error fetching sectors:', error);
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

  return (
    <>
      <Helmet>
        <title>Sectors - DASGUPTA MAITI & ASSOCIATES</title>
        <meta name="description" content="Explore our industry expertise across Banking, Manufacturing, Real Estate, and more." />
      </Helmet>

      {/* Hero Banner (Keep the Skyline as it matches the corporate theme) */}
      <section
        className="position-relative py-5 d-flex align-items-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop')",
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
                Industries We Serve
              </h1>
              <p className="lead opacity-100 mb-4 fade-in-up delay-2" style={{ maxWidth: "800px", fontWeight: "400", textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}>
                We partner with organizations across multiple industries, offering sector-specific audit, taxation, compliance, and advisory services grounded in regulatory expertise and professional integrity.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding bg-light">
        <Container>
          {loading ? (
            <Loading message="Loading sectors..." />
          ) : sectors.length > 0 ? (
            <Row className="g-4">
              {sectors.map((sector, index) => (
                <Col lg={4} md={6} key={sector._id || index} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card
                    className="h-100 border-0 shadow-sm sector-card"
                    style={{
                      backgroundColor: "white",
                      borderTop: "3px solid #002147", // Changed from Gold to Navy Blue for Top Border
                      transition: "all 0.3s ease"
                    }}
                  >
                    <Card.Body className="p-4 text-center d-flex flex-column align-items-center">

                      {/* Icon Circle - Now Navy Blue instead of Gold */}
                      <div
                        className="mb-4 d-flex align-items-center justify-content-center shadow-sm icon-circle"
                        style={{
                          width: '80px',
                          height: '80px',
                          backgroundColor: '#f0f4f8', // Very light blue/gray background
                          color: '#002147', // Corporate Navy Blue Icon
                          borderRadius: '50%',
                          fontSize: '1.5rem',
                          transition: "all 0.3s ease"
                        }}
                      >
                        {(() => {
                          const IconComponent = FaIcons[sector.icon] || MdIcons[sector.icon] || FaIcons.FaBriefcase;
                          return <IconComponent size={32} />;
                        })()}
                      </div>

                      <h3 className="h5 fw-bold mb-3" style={{ color: '#002147', fontFamily: "var(--font-heading)" }}>
                        {sector.title}
                      </h3>

                      <Card.Text className="text-secondary small mb-0 flex-grow-1" style={{ lineHeight: "1.6" }}>
                        {parseBoldText(sector.description)}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <div className="p-5 bg-white shadow-sm rounded-3 d-inline-block">
                <i className="fas fa-city fa-3x mb-3 text-muted opacity-50"></i>
                <p className="text-muted mb-0">Sector details coming soon.</p>
              </div>
            </div>
          )}
        </Container>
      </section>

      <style jsx>{`
        .sector-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
        }
        .sector-card:hover .icon-circle {
            background-color: #002147 !important;
            color: #ffffff !important;
        }
      `}</style>
    </>
  );
};

export default Sectors;
