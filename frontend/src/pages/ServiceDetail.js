import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../utils/api';

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, [slug]);

  const fetchService = async () => {
    try {
      const response = await api.get(`/services/${slug}`);
      setService(response.data);
    } catch (error) {
      console.error('Error fetching service:', error);
      navigate('/services');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async () => {
    if (service.fileURL) {
      window.open(service.fileURL, '_blank');
      return;
    }
    const element = document.getElementById('pdf-template');
    if (!element) return;

    // Ensure accurate capture by scrolling top
    window.scrollTo(0, 0);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: 1000,
        scrollY: 0,
        x: 0,
        y: 0
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${service.title.replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      console.error("PDF Generation failed", err);
    }
  };

  // Helper function to render description with robust bullet points and bold parsing
  const renderDescription = (text, isPdf = false) => {
    if (!text) return null;

    // Shield bold tags to avoid splitting them
    const boldContents = [];
    const BOLD_PH = "___BOLD_PH___";
    const shieldedText = text.replace(/\*\*.*?\*\*/g, (match) => {
      boldContents.push(match);
      return `${BOLD_PH}${boldContents.length - 1}${BOLD_PH}`;
    });

    // Split by * or - markers (handles both inline and start-of-line)
    const segments = shieldedText.split(/\*|-/);
    const elements = [];

    segments.forEach((seg, idx) => {
      let content = seg.trim();
      if (!content && idx === 0) return;

      // Restore bold in this segment
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

      // Lead paragraph (if text doesn't start with a bullet)
      if (idx === 0 && !text.trim().startsWith("*") && !text.trim().startsWith("-")) {
        elements.push(
          <p
            key={`p-${idx}`}
            style={isPdf ? { marginBottom: "20px" } : { marginBottom: "1.5rem" }}
          >
            {restored}
          </p>
        );
      } else {
        // Bullet item
        elements.push(
          <div
            key={`li-${idx}`}
            className="d-flex mb-2 align-items-start"
            style={
              isPdf
                ? { paddingLeft: "20px", marginBottom: "10px" }
                : { paddingLeft: "1rem" }
            }
          >
            <span className="me-2 text-dark" style={{ fontSize: "1.4rem", lineHeight: "1" }}>
              •
            </span>
            <span>{restored}</span>
          </div>
        );
      }
    });

    return elements;
  };

  if (loading) {
    return (
      <Container className="text-center py-5" style={{ marginTop: "100px" }}>
        <Spinner animation="border" style={{ color: "#002147" }} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!service) {
    return null;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Dasgupta Maiti & Associates'
    }
  };

  return (
    <>
      <Helmet>
        <title>{service.seoTitle || service.title} - Dasgupta Maiti & Associates</title>
        <meta name="description" content={service.seoDescription || service.description.substring(0, 160)} />
        <meta name="keywords" content={service.keywords.join(', ')} />
        <meta property="og:title" content={service.seoTitle || service.title} />
        <meta property="og:description" content={service.seoDescription || service.description.substring(0, 160)} />
        {service.imageURL && <meta property="og:image" content={service.imageURL} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* --- HIDDEN PDF TEMPLATE (Off-screen to ensure images load) --- */}
      <div id="pdf-template" style={{ position: 'absolute', left: '-9999px', top: 0, width: '1000px', background: 'white', padding: '40px', fontFamily: '"Times New Roman", Times, serif', zIndex: -1000 }}>
        
        {/* Page Border Container */}
        <div style={{ border: '2px solid #000', padding: '40px', minHeight: '1300px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        
            {/* Header Section */}
            <div style={{ position: 'relative', marginBottom: '10px' }}>
                {/* Logo (Absolute Right) */}
                <img
                    src="/cawebsite_logo.png"
                    alt="DMA Logo"
                    style={{ position: 'absolute', right: '0', top: '0', height: '90px' }}
                />

                {/* Centered Text Info */}
                <div style={{ textAlign: 'center', paddingRight: '100px', paddingLeft: '100px' }}>
                    <h1 style={{ color: '#000', margin: '0', fontSize: '26px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 'bold' }}>
                        DASGUPTA MAITI & ASSOCIATES
                    </h1>
                    <h2 style={{ color: '#000', margin: '5px 0', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
                        CHARTERED ACCOUNTANTS
                    </h2>
                    <p style={{ color: '#000', margin: '5px 0 0 0', fontSize: '14px', fontWeight: 'bold' }}>
                        Flat B1, AC 229,Street 39, Classic Apartments, Action Area 1, New Town , Kolkata – 700156
                    </p>
                </div>
            </div>

            {/* Thick Separator Line */}
            <div style={{ borderTop: '3px solid #000', width: '100%', marginBottom: '40px' }}></div>

            {/* 2. Main Title */}
            <h2 style={{ color: '#002147', fontSize: '28px', borderBottom: '2px solid #D4AF37', paddingBottom: '10px', marginBottom: '30px', fontFamily: 'Arial, sans-serif' }}>
              {service.title}
            </h2>

            {/* 3. Image (Added Back) */}
            {service.imageURL && (
              <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                <img
                  src={service.imageURL}
                  alt={service.title}
                  style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '4px', objectFit: 'cover' }}
                />
              </div>
            )}

            {/* 4. Description Content */}
            <div style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', textAlign: 'justify', fontFamily: 'Arial, sans-serif', flex: '1' }}>
              {renderDescription(service.description, true)}
            </div>

            {/* 5. Footer (Prominent Contact Us) */}
            <div style={{ marginTop: '50px', paddingTop: '40px', borderTop: '3px solid #002147', textAlign: 'center', backgroundColor: '#fdfdfd', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
                <h3 style={{ fontSize: '28px', color: '#D4AF37', marginBottom: '20px', fontWeight: 'bold' }}>Thank you for your interest!</h3>
                <p style={{ fontSize: '18px', color: '#444', marginBottom: '30px' }}>
                  For further inquiries or to schedule a consultation, please contact us.
                </p>
                <div style={{ fontSize: '18px', color: '#002147', fontWeight: 'bold', display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                  <span>📞 +91 98765 43210</span>
                  <span>✉️ contact@dma-ca.com</span>
                  <span>🌐 www.dma-ca.com</span>
                </div>
            </div>
        </div>
      </div>
      {/* --- END PDF TEMPLATE --- */}


      <section className="py-4 bg-light shadow-sm" style={{ marginTop: "0", position: "sticky", top: "76px", zIndex: 900 }}>
        <Container>
          <Row className="justify-content-center">
            <Col md={10}>
              {/* Breadcrumb / Back Link */}
              <Link to="/services" className="text-decoration-none text-muted small fw-bold mb-3 d-block">
                <i className="fas fa-arrow-left me-2"></i> Back to Services
              </Link>

              {/* Simple Clean Header with Action */}
              <div className="d-flex align-items-end justify-content-between mb-4 flex-wrap gap-3">
                <div>
                  <h1 className="display-5 fw-bold font-heading mb-2" style={{ color: "#002147" }}>{service.title}</h1>
                  <div style={{ height: "3px", width: "60px", background: "#D4AF37" }}></div>
                </div>
                <Button
                  onClick={handlePrint}
                  variant="outline-primary"
                  className="px-4 py-2 border-2 fw-bold text-uppercase d-print-none"
                  style={{ fontSize: "0.85rem", borderColor: "#002147", color: "#002147" }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = "#002147"; e.target.style.color = "white"; }}
                  onMouseLeave={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.color = "#002147"; }}
                >
                  <i className="fas fa-file-pdf me-2"></i> Download as PDF
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding bg-white pt-0">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} className="fade-in-up delay-1">
              <div id="service-content" className="p-4 bg-white">
                {service.imageURL && (
                  <img
                    src={service.imageURL}
                    alt={service.title}
                    className="img-fluid rounded mb-5 shadow-sm"
                    style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }}
                  />
                )}

                <div
                  className="service-description text-secondary"
                  style={{ 
                    fontSize: "1.1rem", 
                    lineHeight: "1.8",
                    wordWrap: "break-word", 
                    overflowWrap: "break-word" 
                  }}
                >
                  {renderDescription(service.description)}
                </div>

                <div className="mt-5 pt-4 border-top d-print-none">
                  <p className="mb-2 text-muted fw-bold">Need help with this?</p>
                  <Link to="/contact" className="text-decoration-none fw-bold" style={{ color: "#D4AF37" }}>
                    Contact Us <i className="fas fa-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ServiceDetail;