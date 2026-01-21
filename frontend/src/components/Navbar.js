import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Navbar as BootstrapNavbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import api from '../utils/api';

// --- Navbar Component ---
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [servicesSummary, setServicesSummary] = useState([]);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
        try {
            const { data } = await api.get('/services');
            // Sort by createdAt: 1 (Ascending - Oldest First) is already done in backend? 
            // The user wants "added service will show at last".
            // So if we just take slice(0,3), we get the FIRST 3 added (Oldest 3).
            // Usually dropdowns show either "Top" or "Latest". 
            // If the user said "added service will show at last", it means they want sequential order.
            // So first 3 services added will be shown.
            setServicesSummary(data.slice(0, 3)); 
        } catch (error) {
            console.error("Failed to fetch services for dropdown", error);
        }
    };
    fetchServices();
  }, []);


  // --- Bootstrap CSS Injection (Optional) ---
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    link.integrity =
      "sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM";
    link.crossOrigin = "anonymous";

    const isLoaded = document.querySelector(`link[href="${link.href}"]`);
    if (!isLoaded) document.head.appendChild(link);
  }, []);

  // Focus input when search expands
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchExpanded(false);
      setExpanded(false);
    }
  };

  const toggleSearch = () => {
    const newState = !isSearchExpanded;
    setIsSearchExpanded(newState);
    if (newState) {
      setSearchQuery("");
      setExpanded(false);
    }
  };

  const closeSearch = () => {
    setIsSearchExpanded(false);
    setSearchQuery("");
  };

  return (
    <BootstrapNavbar
      className="shadow-sm"
      sticky="top"
      expand="lg"
      expanded={expanded}
      style={{ backgroundColor: "#002147", minHeight: "76px" }}
    >
      <Container fluid className="px-0 position-relative">
        {/* --- Main Navbar Content --- */}
        <div
          className={`d-flex flex-wrap flex-lg-nowrap w-100 align-items-center justify-content-between navbar-custom-margins ${
            isSearchExpanded ? "invisible" : "visible"
          }`}
          style={{ transition: "visibility 0.1s" }}
        >
          {/* --- Logo and Company Name --- */}
          <div className="d-flex align-items-center z-1">
            <BootstrapNavbar.Brand
              as={Link}
              to="/"
              onClick={() => setExpanded(false)}
              className="fw-bold d-flex align-items-center me-0"
              style={{ color: "white" }}
            >
              {/* REAL LOGO */}
              <img
                src="/cawebsite_logo.png"
                alt="DASGUPTA MAITI & ASSOCIATES Logo"
                height="45"
                className="me-2 me-md-3 navbar-logo"
              />

              <span className="brand-title" style={{ fontSize: "0.9rem", lineHeight: "1.2" }}>
                DASGUPTA MAITI & ASSOCIATES
                <br />
                <small className="brand-subtitle" style={{ fontSize: "0.7rem", opacity: 0.9 }}>
                  CHARTERED ACCOUNTANTS
                </small>
              </span>
            </BootstrapNavbar.Brand>
          </div>

          {/* --- Mobile Toggle --- */}
          <BootstrapNavbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : true)}
            style={{ border: "none" }}
            className="d-lg-none ms-2 p-0 shadow-none"
          >
            {expanded ? (
              // Custom Close Icon
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Custom Hamburger Icon (Varying line lengths)
              <svg
                width="30"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="15" y2="12" />
                <line x1="3" y1="18" x2="9" y2="18" />
              </svg>
            )}
          </BootstrapNavbar.Toggle>

          {/* --- Collapsible Content --- */}
          <BootstrapNavbar.Collapse
            id="basic-navbar-nav"
            className="w-100 w-lg-auto mt-2 mt-lg-0"
          >
            <div className="d-flex flex-column flex-lg-row align-items-center w-100 justify-content-end bg-dark-mobile p-3 p-lg-0 rounded">
              {/* --- Mobile Search (Top) --- */}
              <div className="d-lg-none w-100 mb-3 px-2">
                <Form className="d-flex align-items-center" onSubmit={handleSearch}>
                  <Form.Control
                    type="search"
                    placeholder="Search services, publications, etc..."
                    className="corporate-search-input me-2 bg-transparent text-white shadow-none"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ 
                        border: 'none', 
                        borderBottom: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: 0,
                        color: 'white'
                    }}
                  />
                  <Button variant="link" type="submit" className="p-0 text-white opacity-75">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                       <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 119.5 5a4.5 4.5 0 010 9z" />
                    </svg>
                  </Button>
                </Form>
              </div>

              {/* Navigation Links */}
              <Nav className="d-flex flex-column flex-lg-row align-items-center me-lg-3">
                {[
                  { path: "/", label: "Home" },
                  { path: "/about", label: "About" },
                  { path: "/services", label: "Services", isDropdown: true },

                  { path: "/publications", label: "Publications" },
                  { path: "/newsroom", label: "Newsroom" },
                  { path: "/careers", label: "Career" },
                ].map((link) => {
                   if (link.isDropdown && link.label === "Services") {
                     return (
                        <NavDropdown
                          key={link.label}
                          title={link.label}
                          id="services-dropdown"
                          show={showServicesDropdown}
                          onMouseEnter={() => setShowServicesDropdown(true)}
                          onMouseLeave={() => setShowServicesDropdown(false)}
                          onClick={() => {
                            setExpanded(false);
                            navigate(link.path);
                          }}
                          className={`mx-1 px-2 py-2 navbar-custom-link text-center w-100 w-lg-auto mb-2 mb-lg-0 golden-line-hover`}
                          style={{ fontSize: "0.9rem" }}
                          renderMenuOnMount={true}
                        >
                            {servicesSummary.length > 0 ? (
                                servicesSummary.map(service => (
                                    <NavDropdown.Item 
                                        as={Link} 
                                        to={`/services/${service.slug}`} 
                                        key={service._id}
                                        onClick={() => setExpanded(false)}
                                    >
                                        {service.title}
                                    </NavDropdown.Item>
                                ))
                            ) : (
                                <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
                            )}
                            <NavDropdown.Divider />
                            <NavDropdown.Item 
                                as={Link} 
                                to="/services" 
                                onClick={() => setExpanded(false)}
                                className="fw-bold text-primary"
                            >
                                View All Services
                            </NavDropdown.Item>
                        </NavDropdown>
                     );
                   }
                   return (
                  <Nav.Link
                    key={link.path}
                    as={Link}
                    to={link.path}
                    onClick={() => setExpanded(false)}
                    className={`mx-1 px-2 py-2 navbar-custom-link text-center w-100 w-lg-auto mb-2 mb-lg-0 ${
                      location.pathname === link.path ? "active" : ""
                    } golden-line-hover`}
                    style={{ fontSize: "0.9rem" }}
                  >
                    {link.label}
                  </Nav.Link>
                )})}
              </Nav>

              {/* Icons (UNCHANGED SVGs) */}
              <div className="d-none d-lg-flex align-items-center border-start-lg border-secondary ps-lg-3 ms-lg-2">
                <Button
                  variant="link"
                  onClick={toggleSearch}
                  className="p-2 border-0 text-white"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 119.5 5a4.5 4.5 0 010 9z" />
                  </svg>
                </Button>

                <Button
                  as={Link}
                  to="/contact"
                  onClick={() => setExpanded(false)}
                  variant="link"
                  className="p-2 border-0 text-white"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </Button>
              </div>

              {/* --- Mobile Contact (Bottom) --- */}
              <div className="d-lg-none w-100 mt-3 text-center border-top border-secondary pt-3">
                 <Link to="/contact" className="text-white text-decoration-none fw-bold" onClick={() => setExpanded(false)} style={{ fontSize: '1rem' }}>
                    Contact Us
                 </Link>
              </div>
            </div>
          </BootstrapNavbar.Collapse>
        </div>

        {/* --- Corporate Full-Width Search Bar --- */}
        {isSearchExpanded && (
          <div
            className="corporate-search-bar position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
            style={{ 
              backgroundColor: "#002147", 
              zIndex: 1050,
              animation: "fadeIn 0.3s ease-in-out"
            }}
          >
            <Container fluid>
              <Form
                className="d-flex align-items-center justify-content-center w-100 px-3"
                onSubmit={handleSearch}
              >
                <div className="d-flex align-items-center w-100" style={{ maxWidth: "800px" }}>
                  <Button
                    type="submit"
                    variant="link"
                    className="p-0 border-0 text-white me-3 opacity-75 hover-opacity-100"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                       <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 119.5 5a4.5 4.5 0 010 9z" />
                    </svg>
                  </Button>
                  
                  <Form.Control
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search services, publications, etc..."
                    className="corporate-search-input border-0 bg-transparent text-white p-0 shadow-none"
                    style={{ 
                       fontSize: "1.1rem", 
                       fontWeight: "300",
                       borderBottom: "1px solid rgba(255,255,255,0.3)" 
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <Button
                    variant="link"
                    onClick={closeSearch}
                    className="p-0 ms-3 text-white border-0 opacity-75 hover-opacity-100"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </Button>
                </div>
              </Form>
            </Container>
          </div>
        )}
      </Container>

      {/* Styles */}
      <style>{`
        .opacity-hover:hover { opacity: 0.8; }
        .transition-opacity { transition: opacity 0.2s; }
        
      .navbar-custom-margins { margin: 0 0.2rem; }
        .golden-line-hover { position: relative; }
        .golden-line-hover::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 5px;
          left: 50%;
          background-color: #D4AF37;
          transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
        }
        .golden-line-hover:hover::after {
          width: 80%;
          left: 10%;
        }
        @media (min-width: 992px) {
          .navbar-custom-margins { margin: 0 1rem; }
          .border-start-lg { border-left: 1px solid rgba(255,255,255,0.5); }
        }
        @media (max-width: 991.98px) {
          .bg-dark-mobile { background-color: #002147; width: 100%; border-top: 1px solid rgba(255,255,255,0.1); }
          .border-start-lg { border-left: 0 !important; }
        }
        @media (max-width: 450px) {
            .navbar-logo { height: 35px !important; }
            .brand-title { font-size: 0.7rem !important; }
            .brand-subtitle { font-size: 0.6rem !important; }
        }
      `}</style>
    </BootstrapNavbar>
  );
};

export default Navbar;
