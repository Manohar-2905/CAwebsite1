import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="shadow-lg border-top" style={{ backgroundColor: "#002147", color: "white" }}>
      <Container className="py-4">
        <Row className="gy-4 justify-content-between">
          {/* Column 1: Brand & About - lg=3 */}
          <Col lg={3} md={6} xs={12} className="mb-4 mb-lg-0">
            <h5 className="mb-3 fw-bold font-heading" style={{ color: "#D4AF37", letterSpacing: "1px" }}>
              DASGUPTA MAITI & ASSOCIATES
            </h5>
            <p className="opacity-75 mb-3" style={{ lineHeight: "1.7", fontSize: "0.9rem" }}>
              Providing world-class audit, tax, and financial consulting with integrity. Your strategic partner for sustainable growth.
            </p>
            <div className="mt-2">
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

          {/* Column 2: Quick Links & Services - lg=2 */}
          <Col lg={2} md={6} xs={12} className="mb-4 mb-lg-0">
            <div className="mb-3">
              <h6 className="mb-3 fw-bold text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "1px", color: "#D4AF37" }}>Quick Links</h6>
              <ul className="list-unstyled mb-0" style={{ fontSize: "0.9rem" }}>
                <li className="mb-1"><Link to="/" className="text-decoration-none text-white opacity-75 hover-opacity-100">Home</Link></li>
                <li className="mb-1"><Link to="/about" className="text-decoration-none text-white opacity-75 hover-opacity-100">About Firm</Link></li>
                <li className="mb-1"><Link to="/publications" className="text-decoration-none text-white opacity-75 hover-opacity-100">Publications</Link></li>
                <li className="mb-1"><Link to="/contact" className="text-decoration-none text-white opacity-75 hover-opacity-100">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="mb-3 fw-bold text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "1px", color: "#D4AF37" }}>Services</h6>
              <ul className="list-unstyled" style={{ fontSize: "0.9rem" }}>
                <li className="mb-1"><Link to="/services" className="text-decoration-none text-white opacity-75 hover-opacity-100">Audit & Assurance</Link></li>
                <li className="mb-1"><Link to="/services" className="text-decoration-none text-white opacity-75 hover-opacity-100">Tax Planning</Link></li>
                <li className="mb-1"><Link to="/services" className="text-decoration-none text-white opacity-75 hover-opacity-100">GST Filing</Link></li>
              </ul>
            </div>
          </Col>

          {/* Column 3: Contact & Head Office - lg=3 */}
          <Col lg={3} md={6} xs={12} className="mb-4 mb-lg-0">
            <h6 className="mb-3 fw-bold text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "1px", color: "#D4AF37" }}>Head Office</h6>
            <p className="mb-3 small">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Flat+B1,+AC+229,+Street+39,+Classic+Apartments,+Action+Area+1,+New+Town,+Kolkata+700156"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-white opacity-75 hover-opacity-100 d-flex"
                style={{ lineHeight: '1.6' }}
              >
                <i className="fas fa-map-marker-alt me-2 text-warning mt-1"></i>
                <div>
                  Flat B1, AC 229, Street 39,<br/>
                  Classic Apartments, AA 1,<br/>
                  New Town, Kolkata – 700156
                </div>
              </a>
            </p>

            <h6 className="mb-3 fw-bold text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "1px", color: "#D4AF37" }}>Get in Touch</h6>
            <div className="mb-2 text-white opacity-75 small">
               <p className="mb-1">
                 <a href="mailto:admin@dma-caoffice.in" className="text-white text-decoration-none hover-opacity-100">
                   <i className="fas fa-envelope me-2 text-warning"></i> admin@dma-caoffice.in
                 </a>
               </p>
               <p className="mb-1">
                 <a href="tel:+919874300074" className="text-white text-decoration-none hover-opacity-100">
                   <i className="fas fa-phone me-2 text-warning"></i> +91 98743 00074
                 </a>
               </p>
            </div>
          </Col>

          {/* Column 4: Branch Office 1 - lg=2 */}
          <Col lg={2} md={6} xs={6} className="mb-4 mb-lg-0">
            <h6 className="mb-3 fw-bold text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "1px", color: "#D4AF37" }}>Branch Office 1</h6>
            <div className="mb-3 small">
              <a
                href="https://www.google.com/maps/dir//Premise+No.18,+Flat-1A,+Plot+No.CE%2F1%2FC%2F122,+Street+Number+206,+Rajarhat,+New+Town,+Kolkata,+West+Bengal+700107"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-white opacity-75 hover-opacity-100 d-flex"
                style={{ lineHeight: '1.6' }}
              >
                 <i className="fas fa-map-marker-alt me-2 text-warning mt-1"></i>
                 <div>
                   Flat-1A, Premise No. 18-0206,<br/>
                   Plot No. CE/1/C/122, Newtown,<br/>
                   Rajarhat, Kolkata – 700156
                 </div>
              </a>
              <div className="mt-3 mb-2 pb-2 border-top border-secondary pt-2">
                 <div className="fw-bold text-white small opacity-90 mb-1">Krishnendu Maiti</div>
                 <div className="opacity-75 small">
                    <div className="mb-1">
                        <a href="tel:+918961401688" className="text-white text-decoration-none opacity-75 hover-opacity-100">
                           <i className="fas fa-phone me-1 text-warning" style={{fontSize: '0.7rem'}}></i> +91 89614 01688
                        </a>
                    </div>
                 </div>
              </div>
            </div>
          </Col>

          {/* Column 5: Branch Office 2 - lg=2 */}
          <Col lg={2} md={6} xs={6}>
            <h6 className="mb-3 fw-bold text-uppercase" style={{ fontSize: "0.85rem", letterSpacing: "1px", color: "#D4AF37" }}>Branch Office 2</h6>
            <div className="mb-0 small">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Flat+B1,+AC+229,+Street+39,+Classic+Apartments,+Action+Area+1,+New+Town,+Kolkata+700156"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-white opacity-75 hover-opacity-100 d-flex"
                style={{ lineHeight: '1.6' }}
              >
                <i className="fas fa-map-marker-alt me-2 text-warning mt-1"></i>
                <div>
                  45E/14A - Gauri Apartment,<br/>
                  Moore Avenue,<br/>
                  Manick Bandopadhyay Sarani,<br/>
                  Kolkata – 700040
                </div>
              </a>
              <div className="mt-3 mb-2 pb-2 border-top border-secondary pt-2">
                 <div className="fw-bold text-white small opacity-90 mb-1">Santanu Chatterjee</div>
                 <div className="opacity-75 small">
                    <div className="mb-1">
                        <a href="tel:+919051079796" className="text-white text-decoration-none opacity-75 hover-opacity-100">
                           <i className="fas fa-phone me-1 text-warning" style={{fontSize: '0.7rem'}}></i> +91 90510 79796
                        </a>
                    </div>
                    <div>
                        <a href="mailto:santanu.chatterjee@dma-caoffice.in" className="text-white text-decoration-none opacity-75 hover-opacity-100">
                           <i className="fas fa-envelope me-1 text-warning" style={{fontSize: '0.7rem'}}></i> santanu.chatterjee@dma-caoffice.in
                        </a>
                    </div>
                 </div>
              </div>
            </div>
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
