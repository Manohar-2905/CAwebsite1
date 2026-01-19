import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import api from '../utils/api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('adminToken', response.data.token);
      toast.success('Welcome back! Login successful.');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center" style={{ minHeight: '100vh', backgroundColor: '#eaeef2' }}>
      <Container style={{ maxWidth: '1000px' }}>
        <Card className="border-0 shadow-lg overflow-hidden rounded-4">
          <Row className="g-0">
            {/* Left Side - Branding */}
            <Col md={5} className="d-none d-md-flex flex-column align-items-center justify-content-center p-5 text-white"
              style={{
                background: 'linear-gradient(135deg, #002147 0%, #00152e 100%)', // Corporate Navy
                position: 'relative',
              }}
            >
              {/* Background pattern similar to Hero */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23D4AF37\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
                opacity: 0.5
              }}></div>

              <div className="text-center position-relative" style={{ zIndex: 1 }}>
                <div className="bg-white p-3 rounded-circle mb-4 mx-auto shadow-sm" style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img
                    src="/cawebsite_logo.png"
                    alt="Logo"
                    className="img-fluid"
                    style={{ maxWidth: '80%' }}
                  />
                </div>
                <h3 className="fw-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>DASGUPTA MAITI & ASSOCIATES</h3>
                <span className="badge border border-light rounded-pill px-3 py-2 fw-normal" style={{ letterSpacing: '1px', background: 'rgba(255,255,255,0.1)' }}>
                    Professional Admin Portal
                </span>
                <div className="mt-5 pt-5 border-top border-white border-opacity-25 w-100">
                  <p className="small mb-0 opacity-75">Secure Access Only</p>
                </div>
              </div>
            </Col>

            {/* Right Side - Login Form */}
            <Col md={7} className="p-5 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-5">
                <Link to="/" className="text-decoration-none text-muted small fw-bold text-uppercase" style={{ fontSize: "0.8rem", letterSpacing: "0.5px" }}>
                  <i className="fas fa-arrow-left me-2"></i>Back to Website
                </Link>
                <div className="text-muted small">
                  <i className="fas fa-lock me-1"></i> Secured
                </div>
              </div>

              <div className="mb-4">
                <h2 className="fw-bold" style={{ color: '#002147', fontFamily: "var(--font-heading)" }}>Sign In</h2>
                <p className="text-muted">Enter your credentials to access the dashboard.</p>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-muted small fw-bold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="py-2 px-3 bg-light border-0"
                    style={{ fontSize: '1rem' }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="text-muted small fw-bold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="py-2 px-3 bg-light border-0"
                      style={{ fontSize: '1rem', paddingRight: '45px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary p-0 me-3"
                      style={{ zIndex: 5, textDecoration: 'none' }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </Form.Group>

                <div className="d-grid gap-2 mt-5">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="shadow-sm"
                    style={{
                      backgroundColor: '#002147', // Corporate Navy
                      borderColor: '#002147',
                      padding: '12px',
                      fontWeight: '600',
                      borderRadius: '8px',
                      transition: 'all 0.3s',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontSize: '0.9rem'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#D4AF37'; // Gold Hover
                        e.target.style.borderColor = '#D4AF37';
                        e.target.style.color = '#002147';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#002147';
                        e.target.style.borderColor = '#002147';
                        e.target.style.color = '#fff';
                    }}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Authenticating...
                      </>
                    ) : (
                      'Login to Dashboard'
                    )}
                  </Button>
                </div>
              </Form>
              
              <div className="mt-4 pt-4 border-top">
                  <p className="text-center text-muted small mb-0">
                      Need access? Contact the IT Administrator.
                  </p>
              </div>

            </Col>
          </Row>
        </Card>
        
        <div className="mt-4 text-center">
            <p className="text-muted small opacity-75">
                &copy; {new Date().getFullYear()} Dasgupta Maiti & Associates. All rights reserved.
            </p>
        </div>
      </Container>
    </div>
  );
};

export default AdminLogin;
