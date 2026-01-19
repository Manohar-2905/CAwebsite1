import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import api from "../utils/api";
import sandipImg from "../assets/images/team/sandip_dasgupta.png";
import santanuImg from "../assets/images/team/santanu_chatterjee.png";
import krishnenduImg from "../assets/images/team/krishnendu_maiti.png";

const Home = () => {
  const [services, setServices] = useState([]);
  const [publications, setPublications] = useState([]);
  const [homepageFiles, setHomepageFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, publicationsRes, filesRes] = await Promise.all([
        api.get("/services"),
        api.get("/publications"),
        api.get("/homepage-files"),
      ]);
      setServices(servicesRes.data);
      setPublications(publicationsRes.data.slice(0, 3));
      setHomepageFiles(filesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (fileURL, fileName) => {
    window.open(fileURL, "_blank");
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
        <title>
          DASGUPTA MAITI & ASSOCIATES - Top Chartered Accountant Services in
          India
        </title>
        <meta
          name="description"
          content="Professional CA firm offering audit, tax, GST, ROC compliance, and financial consulting services in India."
        />
        <meta
          name="keywords"
          content="CA services, Audit & Assurance, GST filing, ROC compliance, Company registration, ITR filing, Financial consulting, Chartered accountant services"
        />
        <meta
          property="og:title"
          content="DASGUPTA MAITI & ASSOCIATES - Top Chartered Accountant Services"
        />
        <meta
          property="og:description"
          content="Professional CA firm offering comprehensive audit, tax, and financial consulting services."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section - Premium Glassmorphism Design */}
      <section
        className="hero-section position-relative d-flex align-items-center"
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/${isMobile ? "mobile_hero_bg_v3.jpg" : "home_bg_new.png"
            }?v=${new Date().getTime()}')`,
          backgroundAttachment: isMobile ? "scroll" : "fixed",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: isMobile ? "95vw" : "100vh",
          marginTop: isMobile ? "0px" : "-76px",
          paddingTop: isMobile ? "0px" : "76px",
          overflow: "hidden",
        }}
      >
        {/* Simple minimal overlay to ensure some contrast if image is too bright, but very light */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.2)",
          }}
        ></div>

        <Container
          className="position-relative"
          style={{ zIndex: 2, marginTop: isMobile ? "60px" : "0" }}
        >
          <Row>
            <Col md={9} lg={6}>
              {/* Professional White Card for Content */}
              <div
                className="hero-card p-4 d-none d-md-block"
                style={{
                  backgroundColor: "#ffffff", // Solid White
                  borderRadius: "0px", // Sharp corners
                  boxShadow: "0 8px 32px 0 rgba(0, 33, 71, 0.2)", // Dark blue shadow
                  border: "1px solid rgba(255, 255, 255, 0.3)", // Glass border
                  borderLeft: "5px solid #D4AF37", // Keep Gold accent
                  margin: isMobile ? "120px 15px 10px" : "0",
                  maxWidth: isMobile ? "95%" : "480px",
                }}
              >
                {/* Tag Removed */}

                <h1
                  className="fw-bold mb-3 font-heading fade-in-up delay-1 hero-title"
                  style={{
                    color: "#002147",
                    lineHeight: "1.1",
                    fontSize: isMobile ? "1.8rem" : "inherit", // Smaller font on mobile
                  }}
                >
                  Trusted Partners in <br />
                  <span style={{ color: "#D4AF37" }}>Financial Excellence</span>
                </h1>

                <p
                  className="lead mb-3 fade-in-up delay-2"
                  style={{
                    color: "#444",
                    fontSize: isMobile ? "0.95rem" : "1.25rem", // Adjust text size
                  }}
                >
                  Audit, Tax, Compliance & Advisory Services Delivered with
                  Integrity and Professionalism.
                </p>

                <div
                  className={
                    isMobile
                      ? "d-flex flex-column gap-2 fade-in-up delay-3"
                      : "d-flex gap-3 fade-in-up delay-3"
                  }
                >
                  <Link
                    to="/contact"
                    className="text-uppercase fw-bold text-decoration-none home-hero-btn-custom"
                    style={{
                      backgroundColor: "#002147",
                      color: "white",
                      letterSpacing: "1px",
                      fontWeight: "600",
                      border: "1px solid #002147",
                    }}
                  >
                    Contact Us{" "}
                    <i
                      className="fas fa-chevron-right ms-2"
                      style={{ fontSize: "0.8em" }}
                    ></i>
                  </Link>
                  <Link
                    to="/services"
                    className="text-uppercase fw-bold text-decoration-none home-hero-btn-custom"
                    style={{
                      backgroundColor: "transparent",
                      color: "#002147",
                      border: "1px solid #002147",
                      letterSpacing: "1px",
                      fontWeight: "600",
                    }}
                  >
                    Our Services{" "}
                    <i
                      className="fas fa-chevron-right ms-2"
                      style={{ fontSize: "0.8em" }}
                    ></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Preview - Professional Redesign */}
      <section
        className="section-padding services-section position-relative"
        style={{ backgroundColor: "#F9FAFB" }} // Very light grey for contrast
      >
        <Container>
          <div className="text-center mb-3 mb-lg-5 fade-in-up">
            <span className="text-uppercase fw-bold text-muted small letter-spacing-2">
              What We Do
            </span>
            <h2
              className="fw-bold mt-2"
              style={{
                color: "#002147",
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "1.75rem" : "2.5rem",
              }}
            >
              Our Services
            </h2>
            <div
              className="mx-auto mt-3"
              style={{
                height: "3px",
                width: "60px",
                backgroundColor: "#D4AF37",
              }}
            ></div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : services.length > 3 && !isMobile ? (
            <Carousel
              indicators={false}
              controls={false}
              interval={2000}
              variant="dark"
              className="services-carousel"
            >
              {Array.from({ length: Math.ceil(services.length / 3) }).map(
                (_, slideIndex) => (
                  <Carousel.Item key={slideIndex}>
                    <Row className="g-4 justify-content-center">
                      {services
                        .slice(slideIndex * 3, slideIndex * 3 + 3)
                        .map((service, index) => (
                          <Col md={6} lg={4} key={service._id}>
                            <Card
                              as={Link}
                              to={`/services/${service.slug}`}
                              className="service-card h-100 text-decoration-none border-0 shadow-sm"
                              style={{
                                backgroundColor: "white",
                                borderTop: "3px solid #D4AF37", // Elegant Gold Accent
                                transition:
                                  "transform 0.3s ease, box-shadow 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(-5px)";
                                e.currentTarget.style.boxShadow =
                                  "0 15px 30px rgba(0,0,0,0.08)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                  "translateY(0)";
                                e.currentTarget.style.boxShadow =
                                  "0 .125rem .25rem rgba(0,0,0,.075)";
                              }}
                            >
                              <div
                                className="overflow-hidden"
                                style={{ height: "220px" }}
                              >
                                {service.imageURL ? (
                                  <Card.Img
                                    variant="top"
                                    src={service.imageURL}
                                    className="h-100 w-100 object-fit-cover"
                                    alt={service.title}
                                    style={{
                                      transition: "transform 0.5s ease",
                                    }}
                                  />
                                ) : (
                                  <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light">
                                    <i className="fas fa-briefcase fa-3x text-muted opacity-25"></i>
                                  </div>
                                )}
                              </div>

                              <Card.Body className="p-3 d-flex flex-column">
                                <h3
                                  className="h5 fw-bold mb-2"
                                  style={{
                                    color: "#002147",
                                    fontFamily: "var(--font-heading)",
                                  }}
                                >
                                  {service.title}
                                </h3>

                                <div
                                  className="text-secondary mb-3 flex-grow-1"
                                  style={{
                                    fontSize: "0.85rem",
                                    lineHeight: "1.5",
                                    display: "block",
                                    overflow: "hidden",
                                  }}
                                >
                                  {renderFormattedDescription(
                                    service.description
                                  )}
                                </div>

                                <div className="mt-auto pt-2 border-top border-light">
                                  <span
                                    className="fw-bold text-uppercase"
                                    style={{
                                      fontSize: "0.8rem",
                                      color: "#D4AF37",
                                      letterSpacing: "1px",
                                    }}
                                  >
                                    Read More{" "}
                                    <i
                                      className="fas fa-arrow-right ms-1"
                                      style={{ transition: "transform 0.3s" }}
                                    ></i>
                                  </span>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                    </Row>
                    {/* Add some padding bottom for indicators */}
                    <div className="d-none d-lg-block" style={{ height: "40px" }}></div>
                  </Carousel.Item>
                )
              )}
            </Carousel>
          ) : (
            <Row className="g-4 justify-content-center">
              {(isMobile ? services.slice(0, 3) : services).map((service, index) => (
                <Col
                  md={6}
                  lg={4}
                  key={service._id}
                  className="fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card
                    as={Link}
                    to={`/services/${service.slug}`}
                    className="service-card h-100 text-decoration-none border-0 shadow-sm"
                    style={{
                      backgroundColor: "white",
                      borderTop: "3px solid #D4AF37", // Elegant Gold Accent
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 15px 30px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 .125rem .25rem rgba(0,0,0,.075)";
                    }}
                  >
                    <div
                      className="overflow-hidden"
                      style={{ height: "220px" }}
                    >
                      {service.imageURL ? (
                        <Card.Img
                          variant="top"
                          src={service.imageURL}
                          className="h-100 w-100 object-fit-cover"
                          alt={service.title}
                          style={{ transition: "transform 0.5s ease" }}
                        />
                      ) : (
                        <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light">
                          <i className="fas fa-briefcase fa-3x text-muted opacity-25"></i>
                        </div>
                      )}
                    </div>

                    <Card.Body className="p-3 d-flex flex-column">
                      <h3
                        className="h5 fw-bold mb-2"
                        style={{
                          color: "#002147",
                          fontFamily: "var(--font-heading)",
                        }}
                      >
                        {service.title}
                      </h3>

                      <div
                        className="text-secondary mb-3 flex-grow-1"
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.5",
                          display: "block",
                          overflow: "hidden",
                        }}
                      >
                        {renderFormattedDescription(service.description)}
                      </div>

                      <div className="mt-auto pt-2 border-top border-light">
                        <span
                          className="fw-bold text-uppercase"
                          style={{
                            fontSize: "0.8rem",
                            color: "#D4AF37",
                            letterSpacing: "1px",
                          }}
                        >
                          Read More{" "}
                          <i
                            className="fas fa-arrow-right ms-1"
                            style={{ transition: "transform 0.3s" }}
                          ></i>
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          <div className="text-center mt-3 mt-lg-5">
            <Link
              to="/services"
              className="btn btn-primary rounded-pill shadow-sm text-uppercase fw-bold mobile-btn-small"
              style={{
                backgroundColor: "#002147",
                borderColor: "#002147",
                letterSpacing: "1px",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#D4AF37";
                  e.target.style.borderColor = "#D4AF37";
                  e.target.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#002147";
                  e.target.style.borderColor = "#002147";
                  e.target.style.transform = "translateY(0)";
              }}
            >
              View All Services{" "}
              <i className="fas fa-chevron-right ms-2 small"></i>
            </Link>
          </div>
        </Container>
      </section>

      <style>{`
        /* Hero Section Responsive Styles */
        .hero-title { font-size: 3rem; }
        .hero-card { padding: 3rem; }
        .hero-desc { font-size: 1.1rem; }
        
        /* Custom Button Sizing */
        .mobile-btn-small {
            padding: 1rem 3rem; /* Desktop Default (was px-5 py-3 approx) */
            font-size: 1rem;
        }

        /* Custom Hero Button Styling */
        .home-hero-btn-custom {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 8px 24px !important;
            font-size: 0.8rem !important;
            border-radius: 50px !important;
            min-width: auto !important;
            transition: all 0.3s ease !important;
        }
        
        .home-hero-btn-custom:hover {
            transform: translateY(-2px);
            opacity: 0.9;
        }

        @media (max-width: 1200px) {
            .hero-title { font-size: 2rem; }
            .hero-card { padding: 1.5rem; }
        }
        
        @media (max-width: 992px) {
             .hero-title { font-size: 2rem; }
             /* Mobile/Tablet Button Size */
             .mobile-btn-small {
                 padding: 0.6rem 1.5rem !important;
                 font-size: 0.8rem !important;
             }
        }

        @media (max-width: 768px) {
            .hero-title { font-size: 1.75rem; }
            .hero-card { padding: 1rem !important; }
            .hero-desc { font-size: 0.9rem; }
        }
      `}</style>

      {/* Publications Preview - Professional Design */}
      <section
        className="section-padding publications-section"
        style={{ backgroundColor: "white" }}
      >
        <Container>
          <div className="text-center mb-3 mb-lg-5 fade-in-up">
            <span className="text-uppercase fw-bold text-muted small letter-spacing-2">
              Insights
            </span>
            <h2
              className="fw-bold mt-2"
              style={{
                color: "#002147",
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "1.75rem" : "2.5rem",
              }}
            >
              Latest Publications
            </h2>
            <div
              className="mx-auto mt-3"
              style={{
                height: "3px",
                width: "60px",
                backgroundColor: "#D4AF37",
              }}
            ></div>
          </div>

          {loading ? (
            <div className="text-center py-5">Loading publications...</div>
          ) : publications.length > 0 ? (
            <Row className="g-4">
              {(isMobile ? publications.slice(0, 1) : publications).map((publication, index) => (
                <Col
                  md={6}
                  lg={4}
                  key={publication._id}
                  className="fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card
                    as={Link}
                    to={`/publications/${publication.slug}`}
                    className="h-100 text-decoration-none border-0 shadow-sm"
                    style={{
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      borderTop: "3px solid #D4AF37", // Elegant Gold Accent matching Services
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 15px 30px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 .125rem .25rem rgba(0,0,0,.075)";
                    }}
                  >
                    <div
                      className="overflow-hidden"
                      style={{ height: "220px" }}
                    >
                      {publication.imageURL ? (
                        <Card.Img
                          variant="top"
                          src={publication.imageURL}
                          className="h-100 w-100 object-fit-cover"
                          alt={publication.title}
                          style={{ transition: "transform 0.5s ease" }}
                        />
                      ) : (
                        <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light">
                          <i className="fas fa-file-alt fa-3x text-muted opacity-25"></i>
                        </div>
                      )}
                    </div>

                    <Card.Body className="p-4 d-flex flex-column">
                      <div className="mb-3">
                        <span
                          className="badge rounded-pill fw-normal px-3 py-2"
                          style={{
                            backgroundColor: "#F9FAFB",
                            color: "#666",
                            border: "1px solid #eee",
                          }}
                        >
                          <i className="far fa-calendar-alt me-2 text-warning"></i>
                          {new Date(publication.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <h3
                        className="h5 fw-bold mb-3"
                        style={{
                          color: "#002147",
                          fontFamily: "var(--font-heading)",
                          lineHeight: "1.4",
                        }}
                      >
                        {publication.title}
                      </h3>

                      <Card.Text
                        className="text-secondary mb-4 flex-grow-1"
                        style={{ fontSize: "0.9rem", lineHeight: "1.6" }}
                      >
                        {publication.description.substring(0, 120).trim()}...
                      </Card.Text>

                      <div className="mt-auto pt-3 border-top border-light">
                        <span
                          className="fw-bold text-uppercase"
                          style={{
                            fontSize: "0.8rem",
                            color: "#D4AF37",
                            letterSpacing: "1px",
                          }}
                        >
                          Read More{" "}
                          <i
                            className="fas fa-arrow-right ms-1"
                            style={{ transition: "transform 0.3s" }}
                          ></i>
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center text-muted">No publications found.</div>
          )}
            <div className="text-center mt-3 mt-lg-5">
              <Link
                to="/publications"
                className="btn btn-primary rounded-pill shadow-sm text-uppercase fw-bold mobile-btn-small"
                style={{
                  backgroundColor: "transparent",
                  color: "#002147",
                  borderColor: "#002147",
                  borderWidth: "2px", // Explicitly added to match previous style visually if it was there
                  letterSpacing: "1px",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#D4AF37";
                  e.target.style.borderColor = "#D4AF37";
                  e.target.style.color = "#fff"; // Assuming hover effect wants white text
                  e.target.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.borderColor = "#002147";
                   e.target.style.color = "#002147";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                View All Publications{" "}
                <i className="fas fa-chevron-right ms-2 small"></i>
              </Link>
            </div>
        </Container>
      </section>

      {/* Our Team Section - Replaced About Us */}
      <section className="section-padding team-section" style={{ backgroundColor: "#F9FAFB" }}>
        <Container>
          <div className="text-center mb-5">
            <h3 className="h2 fw-bold" style={{ color: "#002147" }}>Our Team</h3>
            <p className="text-muted">Partners</p>
          </div>

          <Row className="g-4 justify-content-center">
            {[
              {
                name: "FCA Sandip Dasgupta",
                title: "Partner",
                image: sandipImg,
                bio: "Over 25 years of diversified experience in Banking, Infrastructure, Real Estate & Construction, Manufacturing, and Audit & Assurance with extensive audit and advisory exposure."
              },
              {
                name: "ACA Santanu Chatterjee",
                title: "Partner",
                image: santanuImg,
                bio: "Over 25 years of professional experience in the FMCG sectors."
              },
              {
                name: "ACA Krishnendu Maiti",
                title: "Partner",
                image: krishnenduImg,
                bio: "5 years of experience in Accounting, Finance, Direct & Indirect Taxation, and MCA matters. Also, a DISA (ICAI) qualified professional."
              }
            ].map((partner, idx) => (
              <Col md={4} key={idx} className="fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
                <div className="bg-white border rounded shadow-sm h-100 overflow-hidden">
                   {partner.image ? (
                      <div style={{ height: "450px", overflow: "hidden" }}>
                         <img 
                            src={partner.image} 
                            alt={partner.name} 
                            className="w-100 h-100"
                            style={{ objectFit: "cover", objectPosition: "top" }} 
                         />
                      </div>
                   ) : (
                      <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: "450px" }}>
                          <i className="fas fa-user text-secondary opacity-25 fa-5x"></i>
                      </div>
                   )}

                  <div className="p-3 text-center">
                    <h5 className="fw-bold mb-1" style={{ color: "#002147" }}>{partner.name}</h5>
                    <span className="text-uppercase text-muted small fw-bold">{partner.title}</span>
                    <p className="text-muted small mt-2 mb-0">
                      {partner.bio}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 text-center cta-section"
        style={{
          backgroundColor: "white",
          color: "#164B7A",
          padding: isMobile ? "40px 0" : "80px 0",
        }}
      >
        <Container>
          <h2
            className="fw-bold mb-4"
            style={{ fontSize: isMobile ? "1.75rem" : "2.5rem" }}
          >
            Ready to Get Started?
          </h2>
          <p
            className="lead mb-4"
            style={{
              opacity: 0.8,
              color: "#164B7A",
              fontSize: isMobile ? "1rem" : "1.25rem",
              padding: isMobile ? "0 15px" : "0",
            }}
          >
            Let's discuss how we can help your business grow and stay compliant.
          </p>
          <Button
            as={Link}
            to="/contact"
            className="mobile-btn-small"
            style={{
              backgroundColor: "#164B7A",
              color: "white",
              border: "none",
              fontWeight: "600",
            }}
          >
            Contact Us Today
          </Button>
        </Container>
      </section>

      {/* Downloadable Files Section */}
      {homepageFiles.length > 0 && (
        <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
          <Container>
            <h2
              className="text-center fw-bold mb-2"
              style={{ color: "#164B7A", fontSize: "2.5rem" }}
            >
              Downloads
            </h2>
            <p className="text-center text-muted mb-5">
              Download our resources and documents
            </p>
            <Row>
              {homepageFiles.map((file) => (
                <Col md={4} key={file._id} className="mb-3">
                  <Card className="border-0 shadow-sm">
                    <Card.Body>
                      <Card.Title style={{ color: "#164B7A" }}>
                        {file.title}
                      </Card.Title>
                      {file.description && (
                        <Card.Text className="text-muted">
                          {file.description}
                        </Card.Text>
                      )}
                      <Button
                        onClick={() =>
                          handleDownload(file.fileURL, file.fileName)
                        }
                        style={{
                          backgroundColor: "transparent",
                          color: "#164B7A",
                          border: "2px solid #164B7A",
                        }}
                      >
                        Download PDF
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
    </>
  );
};

export default Home;
