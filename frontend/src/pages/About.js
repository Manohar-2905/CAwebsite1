import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Dasgupta Maiti & Associates</title>
        <meta
          name="description"
          content="Leard about Dasgupta Maiti & Associates, a trusted Chartered Accountancy firm since 1940."
        />
      </Helmet>

      {/* Simple Hero */}
      <section className="pb-5 pt-5 bg-light" style={{ marginTop: "0px" }}>
         <Container>
            <div className="text-center max-w-700 mx-auto">
                <h1 className="display-4 fw-bold mb-3 fade-in-up" style={{ color: "#002147" }}>About Our Firm</h1>
                <div className="mx-auto bg-warning fade-in-up delay-1" style={{ height: "3px", width: "50px" }}></div>
            </div>
         </Container>
      </section>

      {/* Executive Summary */}
      <section className="section-padding bg-white">
        <Container>
          <Row className="justify-content-center">
             <Col md={10} lg={8} className="text-center">
                 <h2 className="mb-4" style={{ color: "#002147" }}>Executive Summary</h2>
                 <p className="lead text-secondary mb-4">
                    "Tuned to Truth, Committed to Excellence"
                 </p>
                 <p className="text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
                    At <strong>Dasgupta Maiti & Associates</strong>, we believe that a Chartered Accountancy Firm is more than a service provider—it is a trusted partner in financial excellence. Our firm represents a coalition of specialized skills committed to delivering robust financial solutions, compliance support, and strategic advisory services. We operate with integrity, independence, and professionalism, upholding the highest ethical standards of the ICAI. Guided by our motto, 'Tuned to Truth', we continuously strive to enhance the quality, accuracy, and value of our services for every client we serve.
                 </p>
             </Col>
          </Row>
        </Container>
      </section>

      {/* Our Team - Simple Clean Cards */}
      <section className="section-padding bg-light">
        <Container>
           <div className="text-center mb-5">
              <h3 className="h2 fw-bold" style={{ color: "#002147" }}>Our Team</h3>
              <p className="text-muted">Partners</p>
           </div>

             <Row className="g-4 justify-content-center mb-5">
                {[
                   { 
                     name: "CA Sandip Dasgupta", 
                     title: "Partner",
                     bio: "Over 25 years of diversified experience in Banking, Infrastructure, Real Estate & Construction, Manufacturing, and Audit & Assurance with extensive audit and advisory exposure." 
                   },
                   { 
                     name: "CA Santanu Chatterjee", 
                     title: "Partner",
                     bio: "Over 25 years of professional experience in the FMCG sectors." 
                   },
                   { 
                     name: "CA Krishnendu Maiti", 
                     title: "Partner",
                     bio: "5 years of experience in Accounting, Finance, Direct & Indirect Taxation, and MCA matters. Also, a DISA (ICAI) qualified professional." 
                   }
                ].map((partner, idx) => (
                  <Col md={4} key={idx}>
                     <div className="bg-white border rounded shadow-sm h-100 overflow-hidden">
                        {/* Simple Gray Placeholder */}
                        <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: "300px" }}>
                            <i className="fas fa-user text-secondary opacity-25 fa-5x"></i>
                        </div>
                        
                        <div className="p-4 text-center">
                           <h5 className="fw-bold mb-1" style={{ color: "#002147" }}>{partner.name}</h5>
                           <span className="text-uppercase text-muted small fw-bold">{partner.title}</span>
                           <p className="text-muted small mt-3 mb-0">
                             {partner.bio}
                           </p>
                        </div>
                     </div>
                  </Col>
                ))}
             </Row>

             <div className="text-center mb-5">
                <p className="text-muted h4">Consultants</p>
             </div>

             <Row className="g-4 justify-content-center">
                {[
                   { 
                     name: "Tapas Chakraborty", 
                     title: "Certified Financial Planner",
                     bio: "Certified Financial Planner with decades of experience in investments, financial planning, and capital markets." 
                   },
                   { 
                     name: "Phalguni Chakraborty", 
                     title: "Company Secretary",
                     bio: "Company Secretary with over 10 years of experience in corporate law compliance and secretarial practice." 
                   },
                   { 
                     name: "Tridib Lahiri", 
                     title: "Cost Accountant",
                     bio: "Cost Accountant with 23 years of experience in Finance, Auditing, MIS, Fund Management, and Statutory Compliance." 
                   }
                ].map((consultant, idx) => (
                  <Col md={4} key={idx}>
                     <div className="bg-white border rounded shadow-sm h-100 overflow-hidden">
                        {/* Simple Gray Placeholder */}
                        <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: "300px" }}>
                            <i className="fas fa-briefcase text-secondary opacity-25 fa-5x"></i>
                        </div>
                        
                        <div className="p-4 text-center">
                           <h5 className="fw-bold mb-1" style={{ color: "#002147" }}>{consultant.name}</h5>
                           <span className="text-uppercase text-muted small fw-bold">{consultant.title}</span>
                           <p className="text-muted small mt-3 mb-0">
                             {consultant.bio}
                           </p>
                        </div>
                     </div>
                  </Col>
                ))}
             </Row>
        </Container>
      </section>
    </>
  );
};

export default About;

