import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import api from "../utils/api";
import Loading from "../components/Loading";

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

  const renderFormattedDescription = (text, limit) => {
    if (!text) return "";
    let processed = text;
    if (limit && text.length > limit) {
      processed = text.substring(0, limit).trim() + "...";
    }

    // Temporarily shield bold tags to avoid splitting them
    const boldContents = [];
    const BOLD_PH = "___BOLD_PH___";
    const shieldedText = processed.replace(/\*\*.*?\*\*/g, (match) => {
      boldContents.push(match);
      return `${BOLD_PH}${boldContents.length - 1}${BOLD_PH}`;
    });

    // Split by * or - markers
    const segments = shieldedText.split(/\*|-/);

    return segments.map((seg, idx) => {
      let content = seg.trim();
      if (!content && idx === 0) return null;

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

      // If it's the first segment and the original text didn't start with a marker, treat as paragraph
      if (
        idx === 0 &&
        !processed.startsWith("*") &&
        !processed.startsWith("-")
      ) {
        return (
          <div key={idx} className="mb-2">
            {restored}
          </div>
        );
      }

      // Treat as bullet item
      return (
        <div key={idx} className="d-flex mb-1 align-items-start">
          <span
            className="me-2 text-dark"
            style={{ fontSize: "1.4rem", lineHeight: "1" }}
          >
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
          backgroundImage: `url('${
            isMobile ? "/PhoneView.png" : "/desktopview.png"
          }')`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center", // Centered for balance
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          marginTop: "-76px",
          paddingTop: "76px",
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
            <Col md={7} lg={6}>
              {/* Professional White Card for Content */}
              <div
                className={
                  isMobile
                    ? "p-3 bg-white shadow-lg rounded-0"
                    : "p-5 bg-white shadow-lg rounded-0"
                }
                style={{
                  borderLeft: "5px solid #D4AF37", // Gold accent branding
                  opacity: 0.98,
                  margin: isMobile ? "150px 20px 10px" : "0",
                }}
              >
                {/* Tag Removed */}

                <h1
                  className="fw-bold mb-4 font-heading fade-in-up delay-1"
                  style={{
                    color: "#002147",
                    lineHeight: "1.1",
                    fontSize: isMobile ? "1.75rem" : "3rem",
                  }}
                >
                  Trusted Partners in <br />
                  <span style={{ color: "#D4AF37" }}>Financial Excellence</span>
                </h1>

                <p
                  className="lead mb-4 fade-in-up delay-2"
                  style={{
                    color: "#444",
                    fontSize: isMobile ? "0.9rem" : "1.1rem",
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
                  <Button
                    as={Link}
                    to="/contact"
                    className="text-uppercase fw-bold border-0"
                    style={{
                      backgroundColor: "#002147",
                      color: "white",
                      fontSize: isMobile ? "0.75rem" : "0.9rem",
                      padding: isMobile ? "10px 20px" : "12px 16px",
                      borderRadius: "25px",
                    }}
                  >
                    Contact Us{" "}
                    <i
                      className="fas fa-chevron-right ms-2"
                      style={{ fontSize: "0.8em" }}
                    ></i>
                  </Button>
                  <Button
                    as={Link}
                    to="/services"
                    className="text-uppercase fw-bold"
                    style={{
                      backgroundColor: "transparent",
                      color: "#002147",
                      border: "2px solid #002147",
                      fontSize: isMobile ? "0.75rem" : "0.9rem",
                      padding: isMobile ? "10px 20px" : "12px 16px",
                      borderRadius: "25px",
                    }}
                  >
                    Our Services{" "}
                    <i
                      className="fas fa-chevron-right ms-2"
                      style={{ fontSize: "0.8em" }}
                    ></i>
                  </Button>
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
          <div className="text-center mb-5 fade-in-up">
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
                                    display: "-webkit-box",
                                    WebkitLineClamp: "1",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {renderFormattedDescription(
                                    service.description,
                                    40
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
                    <div style={{ height: "40px" }}></div>
                  </Carousel.Item>
                )
              )}
            </Carousel>
          ) : (
            <Row className="g-4 justify-content-center">
              {services.map((service, index) => (
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
                          display: "-webkit-box",
                          WebkitLineClamp: "1",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {renderFormattedDescription(service.description, 40)}
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

          <div className="text-center mt-5">
            <Button
              as={Link}
              to="/services"
              className="px-5 py-3 fw-bold text-uppercase"
              style={{
                backgroundColor: "transparent",
                color: "#002147",
                border: "2px solid #002147",
                fontSize: isMobile ? "0.75rem" : "0.9rem",
                borderRadius: "25px",
                letterSpacing: "1px",
              }}
            >
              View All Services{" "}
              <i
                className="fas fa-chevron-right ms-2"
                style={{ fontSize: "0.8em" }}
              ></i>
            </Button>
          </div>
        </Container>
      </section>

      {/* Publications Preview - Professional Design */}
      <section
        className="section-padding publications-section"
        style={{ backgroundColor: "white" }}
      >
        <Container>
          <div className="text-center mb-5 fade-in-up">
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
              {publications.map((publication, index) => (
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
          <div className="text-center mt-4">
            <Button
              as={Link}
              to="/publications"
              className="px-5 py-3 fw-bold text-uppercase"
              style={{
                backgroundColor: "transparent",
                color: "#002147",
                border: "2px solid #002147",
                fontSize: isMobile ? "0.75rem" : "0.9rem",
                borderRadius: "25px",
                letterSpacing: "1px",
              }}
            >
              View All Publications{" "}
              <i
                className="fas fa-chevron-right ms-2"
                style={{ fontSize: "0.8em" }}
              ></i>
            </Button>
          </div>
        </Container>
      </section>

      {/* Why Choose Us - Professional Icon Grid */}
      <section
        className="section-padding why-choose-us-section"
        style={{ backgroundColor: "#F9FAFB" }}
      >
        <Container>
          <div className="text-center mb-5 fade-in-up">
            <span className="text-uppercase fw-bold text-muted small letter-spacing-2">
              Why Choose Us
            </span>
            <h2
              className="fw-bold mt-2"
              style={{
                color: "#002147",
                fontFamily: "var(--font-heading)",
                fontSize: isMobile ? "1.75rem" : "2.5rem",
              }}
            >
              Excellence in Every Detail
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

          <Row className="g-4 justify-content-center">
            {/* Feature 1 - Expertise */}
            <Col
              md={4}
              className="fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div
                className="h-100 p-5 bg-white text-center rounded-0 position-relative hover-lift"
                style={{
                  borderTop: "4px solid #D4AF37",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.05)";
                }}
              >
                <div
                  className="mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#FDF8E4",
                    color: "#D4AF37",
                  }}
                >
                  <i className="fas fa-users-cog fa-2x"></i>
                </div>
                <h3 className="h4 fw-bold mb-3" style={{ color: "#002147" }}>
                  Unmatched Expertise
                </h3>
                <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>
                  Our team of 750+ professionals combines decades of deep
                  regulatory knowledge with modern strategic insight.
                </p>
              </div>
            </Col>

            {/* Feature 2 - Integrity */}
            <Col
              md={4}
              className="fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="h-100 p-5 bg-white text-center rounded-0 position-relative hover-lift"
                style={{
                  borderTop: "4px solid #002147",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.05)";
                }}
              >
                <div
                  className="mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#E6EAED",
                    color: "#002147",
                  }}
                >
                  <i className="fas fa-balance-scale fa-2x"></i>
                </div>
                <h3 className="h4 fw-bold mb-3" style={{ color: "#002147" }}>
                  Unwavering Integrity
                </h3>
                <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>
                  Serving with transparency since 1940. We build relationships
                  on trust, ensuring your compliance is never compromised.
                </p>
              </div>
            </Col>

            {/* Feature 3 - Technology */}
            <Col
              md={4}
              className="fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div
                className="h-100 p-5 bg-white text-center rounded-0 position-relative hover-lift"
                style={{
                  borderTop: "4px solid #D4AF37",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 30px rgba(0,0,0,0.05)";
                }}
              >
                <div
                  className="mb-4 mx-auto d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#FDF8E4",
                    color: "#D4AF37",
                  }}
                >
                  <i className="fas fa-chart-line fa-2x"></i>
                </div>
                <h3 className="h4 fw-bold mb-3" style={{ color: "#002147" }}>
                  Results Driven
                </h3>
                <p className="text-muted mb-0" style={{ lineHeight: "1.7" }}>
                  We don't just manage books; we engineer growth. Our strategies
                  are designed to optimize your financial performance.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      {/* Testimonials Section - Light Professional */}
      <section
        className="py-5 testimonials-section"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <Container>
          <div className="text-center mb-5 fade-in-up">
            <span className="text-uppercase fw-bold text-muted small letter-spacing-2">
              Client Endorsements
            </span>
            <h2
              className="fw-bold mt-2 font-heading"
              style={{
                color: "#002147",
                fontSize: isMobile ? "1.75rem" : "2.5rem",
              }}
            >
              Trusted by Leaders
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

          <Row className="g-4">
            {/* Client 1 */}
            <Col
              md={4}
              className="fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div
                className="h-100 p-4 rounded-3 position-relative"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eef0f2",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  className="position-absolute"
                  style={{
                    top: "-15px",
                    left: "30px",
                    background: "#fff",
                    padding: "0 10px",
                  }}
                >
                  <i
                    className="fas fa-quote-left fa-2x"
                    style={{ color: "#D4AF37" }}
                  ></i>
                </div>
                <div className="pt-4">
                  <p
                    className="mb-4 text-secondary"
                    style={{
                      fontSize: "1.05rem",
                      lineHeight: "1.8",
                      fontStyle: "italic",
                    }}
                  >
                    "CA Consultancy has been our strategic anchor for over a
                    decade. Their proactive tax planning and regulatory guidance
                    have been instrumental in our expansion."
                  </p>
                  <div className="d-flex align-items-center mt-3 pt-3 border-top border-light">
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        color: "#002147",
                        fontWeight: "bold",
                      }}
                    >
                      RK
                    </div>
                    <div className="ms-3">
                      <div
                        className="fw-bold"
                        style={{ color: "#002147", fontSize: "0.95rem" }}
                      >
                        Rajesh Kumar
                      </div>
                      <div className="small text-muted">
                        CEO, Tech Solutions Pvt Ltd
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Client 2 */}
            <Col
              md={4}
              className="fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="h-100 p-4 rounded-3 position-relative"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eef0f2",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  className="position-absolute"
                  style={{
                    top: "-15px",
                    left: "30px",
                    background: "#fff",
                    padding: "0 10px",
                  }}
                >
                  <i
                    className="fas fa-quote-left fa-2x"
                    style={{ color: "#D4AF37" }}
                  ></i>
                </div>
                <div className="pt-4">
                  <p
                    className="mb-4 text-secondary"
                    style={{
                      fontSize: "1.05rem",
                      lineHeight: "1.8",
                      fontStyle: "italic",
                    }}
                  >
                    "Availability and accuracy are what define their team.
                    Whether it's a routine audit or a complex merger, their
                    precision ensures we are always compliant."
                  </p>
                  <div className="d-flex align-items-center mt-3 pt-3 border-top border-light">
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        color: "#002147",
                        fontWeight: "bold",
                      }}
                    >
                      PS
                    </div>
                    <div className="ms-3">
                      <div
                        className="fw-bold"
                        style={{ color: "#002147", fontSize: "0.95rem" }}
                      >
                        Priya Sharma
                      </div>
                      <div className="small text-muted">
                        CFO, Manufacturing Corp
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Client 3 */}
            <Col
              md={4}
              className="fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div
                className="h-100 p-4 rounded-3 position-relative"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #eef0f2",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  className="position-absolute"
                  style={{
                    top: "-15px",
                    left: "30px",
                    background: "#fff",
                    padding: "0 10px",
                  }}
                >
                  <i
                    className="fas fa-quote-left fa-2x"
                    style={{ color: "#D4AF37" }}
                  ></i>
                </div>
                <div className="pt-4">
                  <p
                    className="mb-4 text-secondary"
                    style={{
                      fontSize: "1.05rem",
                      lineHeight: "1.8",
                      fontStyle: "italic",
                    }}
                  >
                    "Outstanding service! Their GST filing and compliance
                    support has made our operations so much smoother. Highly
                    recommended for any business."
                  </p>
                  <div className="d-flex align-items-center mt-3 pt-3 border-top border-light">
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        color: "#002147",
                        fontWeight: "bold",
                      }}
                    >
                      AP
                    </div>
                    <div className="ms-3">
                      <div
                        className="fw-bold"
                        style={{ color: "#002147", fontSize: "0.95rem" }}
                      >
                        Amit Patel
                      </div>
                      <div className="small text-muted">
                        Director, Retail Chain
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
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
            size={isMobile ? "md" : "lg"}
            style={{
              backgroundColor: "#164B7A",
              color: "white",
              border: "none",
              padding: isMobile ? "10px 30px" : "12px 40px",
              fontWeight: "600",
              fontSize: isMobile ? "0.9rem" : "1.1rem",
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
