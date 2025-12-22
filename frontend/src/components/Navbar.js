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
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);


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
                className="me-2 me-md-3"
              />

              <span style={{ fontSize: "0.9rem", lineHeight: "1.2" }}>
                DASGUPTA MAITI & ASSOCIATES
                <br />
                <small style={{ fontSize: "0.7rem", opacity: 0.9 }}>
                  CHARTERED ACCOUNTANTS
                </small>
              </span>
            </BootstrapNavbar.Brand>
          </div>

          {/* --- Mobile Toggle --- */}
          <BootstrapNavbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : true)}
            style={{ borderColor: "rgba(255,255,255,0.5)" }}
            className="d-lg-none ms-2"
          >
            <span
              className="navbar-toggler-icon"
              style={{ filter: "invert(1)" }}
            />
          </BootstrapNavbar.Toggle>

          {/* --- Collapsible Content --- */}
          <BootstrapNavbar.Collapse
            id="basic-navbar-nav"
            className="w-100 w-lg-auto mt-2 mt-lg-0"
          >
            <div className="d-flex flex-column flex-lg-row align-items-center w-100 justify-content-end bg-dark-mobile p-3 p-lg-0 rounded">
              {/* Navigation Links */}
              <Nav className="d-flex flex-column flex-lg-row align-items-center me-lg-3 w-100">
                {/* Mobile Search Bar */}
                <div className="d-lg-none w-100 px-3 mb-3 mt-2">
                  <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control
                      type="search"
                      placeholder="Search..."
                      className="me-2 text-white bg-transparent border-white placeholder-white-50"
                      aria-label="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{ color: 'white' }}
                    />
                    <Button variant="outline-light" type="submit">Go</Button>
                  </Form>
                </div>

                {[
                  { path: "/", label: "Home" },
                  { path: "/about", label: "About" },
                  { path: "/services", label: "Services" },
                  { path: "/sectors", label: "Sectors" },
                  { path: "/publications", label: "Publications" },
                  { path: "/newsroom", label: "Newsroom" },
                  { path: "/careers", label: "Career" },
                  ].map((link) => (
                  <Nav.Link
                    key={link.path}
                    as={Link}
                    to={link.path}
                    onClick={() => setExpanded(false)}
                    className={`px-2 py-2 navbar-custom-link text-center w-100 w-lg-auto mb-2 mb-lg-0 ${
                      location.pathname === link.path ? "active" : ""
                    } golden-line-hover`}
                    style={{ fontSize: '0.9rem', letterSpacing: '0.5px' }}
                  >
                    {link.label}
                  </Nav.Link>
                ))}

                {/* Mobile Contact Link */}
                <Nav.Link
                  as={Link}
                  to="/contact"
                  onClick={() => setExpanded(false)}
                  className={`mx-2 px-3 py-2 navbar-custom-link text-center w-100 w-lg-auto mb-2 mb-lg-0 d-lg-none ${
                    location.pathname === "/contact" ? "active" : ""
                  } golden-line-hover`}
                >
                  Contact Us
                </Nav.Link>
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
            </div>
          </BootstrapNavbar.Collapse>
        </div>

        {/* --- Search Overlay --- */}
        {isSearchExpanded && (
          <div
            className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center w-100"
            style={{ zIndex: 1050 }}
          >
            <Form
              className="d-flex align-items-center bg-white rounded-pill px-3 py-2 shadow-lg"
              onSubmit={handleSearch}
              style={{ width: "90%", maxWidth: "600px" }}
            >
              <Button
                type="submit"
                variant="link"
                className="p-0 border-0 text-primary me-2"
              >
                🔍
              </Button>
              <Form.Control
                ref={searchInputRef}
                type="search"
                placeholder="Search services, publications..."
                className="border-0 shadow-none bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="link"
                onClick={closeSearch}
                className="p-0 ms-2 text-secondary border-0"
              >
                ✖
              </Button>
            </Form>
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
          .navbar-custom-margins { margin: 0 3rem; }
          .border-start-lg { border-left: 1px solid rgba(255,255,255,0.5); }
        }
        @media (max-width: 991.98px) {
          .bg-dark-mobile { background-color: #002147; width: 100%; border-top: 1px solid rgba(255,255,255,0.1); }
          .border-start-lg { border-left: 0 !important; }
        }
      `}</style>
    </BootstrapNavbar>
  );
};

export default Navbar;
