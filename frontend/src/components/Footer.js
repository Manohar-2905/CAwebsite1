import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="shadow-lg border-top" style={{ backgroundColor: "#002147", color: "white" }}>
      <Container className="py-4 py-md-5">
        <Row className="gy-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="mb-4 fw-bold font-heading" style={{ color: "#D4AF37", letterSpacing: "1px" }}>
              DASGUPTA MAITI & ASSOCIATES
            </h5>
            <p className="opacity-75" style={{ lineHeight: "1.7", fontSize: "0.95rem" }}>
              Providing world-class audit, tax, and financial consulting with integrity. Your strategic partner for sustainable growth.
            </p>
            <div className="mt-4 d-flex gap-3">
              <a
                href="https://in.linkedin.com/in/dasgupta-maiti-and-associates-07538a372"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white opacity-75 hover-opacity-100 transition-all"
              >
                <i className="fab fa-linkedin-in fa-lg"></i>
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
              <a href="mailto:admin@dma-caoffice.in" className="text-white text-decoration-none">admin@dma-caoffice.in</a>
            </p>
            <p className="mb-2 opacity-75">
              <i className="fas fa-phone me-2 text-warning"></i>
              <a href="tel:+919874300074" className="text-white text-decoration-none">+91 98743 00074</a>
              <span> / </span>
              <a href="tel:+918961401688" className="text-white text-decoration-none">+91 89614 01688</a>
            </p>
            <p className="mb-3">
              <span className="text-uppercase fw-bold d-block mb-1" style={{ fontSize: "0.75rem", color: "#D4AF37" }}>Head Office</span>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Flat+B1,+AC+229,+Street+39,+Classic+Apartments,+Action+Area+1,+New+Town,+Kolkata+700156"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: "white", opacity: 0.9, fontSize: "0.9rem" }}
              >
                <i className="fas fa-map-marker-alt me-2"></i>
                Flat B1, AC 229, Street 39, Classic Apartments, AA 1, New Town, Kolkata – 700156
              </a>
            </p>
            <p className="mb-2">
              <span className="text-uppercase fw-bold d-block mb-1" style={{ fontSize: "0.75rem", color: "#D4AF37" }}>Branch Office 1</span>
              <a
                href="https://www.google.com/maps/dir//Premise+No.18,+Flat-1A,+Plot+No.CE%2F1%2FC%2F122,+Street+Number+206,+Rajarhat,+New+Town,+Kolkata,+West+Bengal+700107"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
                style={{ color: "white", opacity: 0.9, fontSize: "0.9rem" }}
              >
                <i className="fas fa-map-marker-alt me-2"></i>
                Flat-1A, Premise No. 18-0206, Plot No. CE/1/C/122, Newtown, Rajarhat, Kolkata – 700156
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
                <span className="text-white opacity-50 me-3">Privacy</span>
                <span className="text-white opacity-50">Terms</span>
              </small>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
