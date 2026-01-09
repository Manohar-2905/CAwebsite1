import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Spinner, Button, Form, Modal, Alert, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../utils/api';

const CareerDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    experience: '',
    resume: null
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCareer();
  }, [slug]);

  const fetchCareer = async () => {
    try {
      const response = await api.get(`/careers/${slug}`);
      setCareer(response.data);
    } catch (error) {
      console.error('Error fetching career:', error);
      navigate('/careers');
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();

    if (!applicationForm.resume) {
      toast.error('Please upload your resume');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('careerId', career._id);
      formData.append('careerTitle', career.title);
      formData.append('name', applicationForm.name);
      formData.append('email', applicationForm.email);
      formData.append('phone', applicationForm.phone);
      formData.append('coverLetter', applicationForm.coverLetter);
      formData.append('experience', applicationForm.experience);
      formData.append('resume', applicationForm.resume);

      await api.post('/career-applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Application submitted successfully! We will get back to you soon.');
      setShowApplyModal(false);
      setApplicationForm({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
        experience: '',
        resume: null
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5" style={{ marginTop: "100px" }}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!career) {
    return null;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: career.title,
    description: career.description,
    employmentType: career.type,
    jobLocation: {
      '@type': 'Place',
      addressLocality: career.location
    }
  };

  return (
    <>
      <Helmet>
        <title>{career.title} - Careers - DASGUPTA MAITI & ASSOCIATES</title>
        <meta name="description" content={career.description.substring(0, 160)} />
        <meta name="keywords" content={career.keywords ? career.keywords.join(', ') : ''} />
        <meta property="og:title" content={career.title} />
        <meta property="og:description" content={career.description.substring(0, 160)} />
        {career.imageURL && <meta property="og:image" content={career.imageURL} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Header Area */}
      <section className="py-4 bg-light border-bottom" style={{ marginTop: "0" }}>
        <Container>
          <Button
            as={Link}
            to="/careers"
            variant="link"
            className="text-decoration-none p-0 text-muted fw-bold text-uppercase mb-3"
            style={{ fontSize: "0.8rem", letterSpacing: "1px" }}
          >
            <i className="fas fa-arrow-left me-2"></i> All Opportunities
          </Button>
          <h1 className="display-4 fw-bold" style={{ color: "#002147", fontFamily: "var(--font-heading)" }}>
            {career.title}
          </h1>
        </Container>
      </section>

      <section className="section-padding">
        <Container>
          {/* TWO DIVS with GAP */}
          <Row className="g-5">

            {/* DIV 1: Job Description AND Details */}
            <Col lg={8}>
              <div className="fade-in-up">
                {/* Job Details moved here */}
                <div className="mb-5 p-4 bg-light rounded-3 border">
                  <Row className="g-3">
                    <Col md={4}>
                      <div className="text-muted small fw-bold text-uppercase mb-1">Department</div>
                      <div className="fw-bold text-dark">{career.department || "General"}</div>
                    </Col>
                    <Col md={4}>
                      <div className="text-muted small fw-bold text-uppercase mb-1">Type</div>
                      <div className="fw-bold text-dark">{career.type || "Full Time"}</div>
                    </Col>
                    <Col md={4}>
                      <div className="text-muted small fw-bold text-uppercase mb-1">Location</div>
                      <div className="fw-bold text-dark">{career.location || "On-site"}</div>
                    </Col>
                  </Row>
                </div>

                <h3 className="fw-bold mb-4" style={{ color: "#002147" }}>
                  Job Description
                </h3>
                <div
                  className="career-content"
                  style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#444" }}
                  dangerouslySetInnerHTML={{ __html: (career.content || career.description).replace(/\n/g, '<br />') }}
                />

                {!career.content && (
                  <div className="mt-5">
                    <h4 className="fw-bold" style={{ color: "#002147" }}>Requirements</h4>
                    <ul className="text-secondary mt-3 ps-3" style={{ fontSize: "1rem", lineHeight: "1.7" }}>
                      <li className="mb-2">Demonstrate deep knowledge of regulatory standards and compliance.</li>
                      <li className="mb-2">Work collaboratively with cross-functional teams to deliver client success.</li>
                      <li className="mb-2">Excellent analytical, verbal, and written communication skills.</li>
                      <li className="mb-2">Maintain the highest standards of integrity and professional ethics.</li>
                    </ul>
                  </div>
                )}
              </div>
            </Col>

            {/* DIV 2: Apply Link ONLY */}
            <Col lg={4}>
              <div className="sticky-top" style={{ top: "100px", zIndex: 1 }}>
                {/* Just the Apply Button/Link as requested */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 fw-bold text-uppercase py-3 shadow-lg hover-lift"
                  style={{ letterSpacing: "1px", backgroundColor: "#D4AF37", borderColor: "#D4AF37", color: "#002147" }}
                  onClick={() => setShowApplyModal(true)}
                >
                  Apply For This Job
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Apply Modal */}
      <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold" style={{ color: "#002147" }}>Apply for {career.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleApplicationSubmit}>
          <Modal.Body className="p-4">
            <Alert variant="light" className="mb-4 border shadow-sm">
              <i className="fas fa-info-circle me-2 text-primary"></i>
              Please fill in all required fields and upload your resume to apply.
            </Alert>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small text-uppercase text-muted">Full Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                value={applicationForm.name}
                onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                required
                className="py-2"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small text-uppercase text-muted">Email <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="email"
                    value={applicationForm.email}
                    onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold small text-uppercase text-muted">Phone <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="tel"
                    value={applicationForm.phone}
                    onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                    required
                    className="py-2"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small text-uppercase text-muted">Years of Experience</Form.Label>
              <Form.Control
                type="number"
                value={applicationForm.experience}
                onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
                placeholder="e.g., 2 years in accounting"
                className="py-2"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small text-uppercase text-muted">Cover Letter</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={applicationForm.coverLetter}
                onChange={(e) => setApplicationForm({ ...applicationForm, coverLetter: e.target.value })}
                placeholder="Tell us why you're interested in this position..."
                className="py-2"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold small text-uppercase text-muted">Resume/CV (PDF) <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={(e) => setApplicationForm({ ...applicationForm, resume: e.target.files[0] })}
                required
                className="py-2"
              />
              <Form.Text className="text-muted small">
                Please upload your resume in PDF format
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0 pb-4 px-4">
            <Button variant="outline-secondary" onClick={() => setShowApplyModal(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={submitting} className="px-4 fw-bold">
              {submitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CareerDetail;
