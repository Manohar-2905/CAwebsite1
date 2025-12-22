import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="shadow-lg border-top mt-0" style={{ backgroundColor: "#002147", color: "white" }}>
      <Container className="py-5">
        <Row className="gy-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-4 fw-bold font-heading" style={{ color: "#D4AF37", letterSpacing: "1px" }}>
              DASGUPTA MAITI & ASSOCIATES
            </h5>
            <p className="opacity-75" style={{ lineHeight: "1.7", fontSize: "0.95rem" }}>
              Providing world-class audit, tax, and financial consulting with integrity since 1940. Your strategic partner for sustainable growth.
            </p>
            <div className="mt-4 d-flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-75 hover-opacity-100 transition-all"
              >
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-75 hover-opacity-100 transition-all"
              >
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-75 hover-opacity-100 transition-all"
              >
                <i className="fab fa-linkedin-in fa-lg"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-75 hover-opacity-100 transition-all"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </Col>

          <Col md={2} className="mb-4 mb-md-0">
            <h6 className="mb-3 fw-bold text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "1px", color: "#D4AF37" }}>Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-white opacity-75 hover-opacity-100">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-white opacity-75 hover-opacity-100">About Firm</Link>
              </li>
              <li className="mb-2">
                <Link to="/publications" className="text-decoration-none text-white opacity-75 hover-opacity-100">Publications</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none text-white opacity-75 hover-opacity-100">Contact</Link>
              </li>
            </ul>
          </Col>

          <Col md={3} className="mb-4 mb-md-0">
            <h6 className="mb-3 fw-bold text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "1px", color: "#D4AF37" }}>Services</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/services" className="text-decoration-none text-white opacity-75 hover-opacity-100">Audit & Assurance</Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-decoration-none text-white opacity-75 hover-opacity-100">Tax Planning</Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-decoration-none text-white opacity-75 hover-opacity-100">GST Filing</Link>
              </li>
              <li className="mb-2">
                <Link to="/services" className="text-decoration-none text-white opacity-75 hover-opacity-100">ROC Compliance</Link>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="mb-3 fw-bold text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "1px", color: "#D4AF37" }}>Contact</h6>
            <p className="mb-2 opacity-75">
              <i className="fas fa-envelope me-2 text-warning"></i>
              info@dma-ca.com
            </p>
            <p className="mb-2 opacity-75">
              <i className="fas fa-phone me-2 text-warning"></i>
              +91-9876543210
            </p>
            <p className="mb-2">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Flat+B1,+AC+229,Street+39,+Classic+Apartments,+Action+Area+1,+New+Town+,+Kolkata+%E2%80%93+700156"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: "white", opacity: 0.9 }}
              >
                <i className="fas fa-map-marker-alt me-2"></i>
                Flat B1, AC 229,Street 39, Classic Apartments, Action Area 1, New Town , Kolkata – 700156
              </a>
            </p>
          </Col>
        </Row>
      </Container>

      {/* Copyright Section */}
      <div className="border-top border-secondary py-3" style={{ backgroundColor: "#001a35" }}>
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-start">
              <small className="opacity-50">
                &copy; {new Date().getFullYear()} DASGUPTA MAITI & ASSOCIATES. All rights reserved.
              </small>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <small>
                <Link to="/privacy" className="text-decoration-none text-white opacity-50 hover-opacity-100 me-3">Privacy</Link>
                <Link to="/terms" className="text-decoration-none text-white opacity-50 hover-opacity-100">Terms</Link>
              </small>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
