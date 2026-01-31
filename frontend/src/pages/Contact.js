import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

import api from '../utils/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
             try {
                 const res = await api.get('/services');
                 setServices(res.data);
             } catch (err) {
                 console.error('Failed to fetch services', err);
             }
        };
        fetchServices();
    }, []);

    // Debugging: Verify version in console
    console.log('Contact Page Component Loaded - Version: FINAL OFFICE UPDATE');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // VALIDATION: Ensure at least one contact method is provided
        if (!formData.email && !formData.phone) {
            toast.error('Please provide either an Email OR a Phone Number so we can contact you.');
            return;
        }

        setLoading(true);

        let sentSuccessfully = false;

        try {
            // Backend Email
            try { 
                await api.post('/contact/send-email', formData); 
                sentSuccessfully = true; 
            } catch (err) { 
                console.warn('Backend err:', err);
                if (err.response && err.response.data) {
                    console.warn('Backend error message:', err.response.data);
                }
                throw err; 
            }
            // Backend WhatsApp
            try { await api.post('/contact/send-whatsapp', formData); sentSuccessfully = true; } catch (err) { console.warn('Whatsapp err', err); }

            if (sentSuccessfully) {
                toast.success('Thank you. Your message has been sent successfully.');
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
            } else {
                toast.error('Unable to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Backend err:', error);
            // Serialize error for user visibility
            const debugError = error.response?.data ? JSON.stringify(error.response.data) : error.message;
            console.log('Backend error message (Clean):', debugError);
            
            const errorMsg = error.response?.data?.message || error.response?.data?.error || 'An error occurred';
            toast.error(`Failed: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact Us - DASGUPTA MAITI & ASSOCIATES | CA in New Town</title>
                <meta name="description" content="Contact Dasgupta Maiti & Associates, top Chartered Accountants in New Town, Kolkata. Get expert audit, tax, and financial consulting services today." />
                <meta name="keywords" content="Contact CA Kolkata, Chartered Accountant New Town, Dasgupta Maiti Associates Address, best CA firm contact" />
            </Helmet>

            <div style={{ position: 'relative', backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '80px' }}>

                {/* --- SPLIT HEADER BACKGROUND --- */}
                {/* Top Navy Section */}
                <div style={{
                    backgroundColor: '#002a54',
                    height: '380px',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 0
                }}></div>

                {/* --- OVERLAPPING CARD CONTAINER --- */}
                <Container style={{ position: 'relative', zIndex: 1, paddingTop: '100px' }}>

                    {/* Page Title (Outside Card, on Navy Background) */}
                    <div className="text-center mb-5 fade-in-up">
                        <h5 className="text-uppercase mb-2 fw-bold" style={{ color: '#D4AF37', letterSpacing: '2px' }}>
                            Get In Touch
                        </h5>
                        <h1 className="display-4 fw-bold text-white fade-in-up delay-1">
                            How can we assist you?
                        </h1>
                    </div>

                    <Row className="justify-content-center">
                        <Col lg={11} xl={10}>
                            <Card className="border-0 shadow-lg overflow-hidden fade-in-up delay-2" style={{ borderRadius: '4px' }}>
                                <Row className="g-0">
                                    {/* LEFT SIDE: Head Office & Direct Contact (Dark Theme) */}
                                    <Col lg={3} className="p-4 d-flex flex-column text-white border-end border-secondary" style={{ backgroundColor: '#002a54' }}>
                                        <div className="mb-4">
                                            <h5 className="fw-bold text-white mb-3">Head Office</h5>
                                            <div style={{ width: '30px', height: '3px', backgroundColor: '#D4AF37', marginBottom: '15px' }}></div>
                                            <p className="text-white-50 mb-0 opacity-75 small">
                                                Flat B1, AC 229, Street 39, Classic Apartments<br />
                                                Action Area 1, New Town, Kolkata – 700156
                                            </p>
                                        </div>

                                        <div className="mt-auto">
                                            <h6 className="fw-bold text-uppercase small mb-3" style={{ letterSpacing: '1px', color: '#D4AF37' }}>Direct Contact</h6>
                                            <p className="text-white-50 mb-2 opacity-75 small">
                                                <i className="fas fa-phone-alt me-2 text-warning"></i> 
                                                <a href="tel:+919874300074" className="text-decoration-none text-white-50 hover-text-white">+91 98743 00074</a>
                                                <span className="mx-1">/</span>
                                                <a href="tel:+918961401688" className="text-decoration-none text-white-50 hover-text-white">+91 89614 01688</a>
                                            </p>
                                            <p className="text-white-50 mb-2 opacity-75 small">
                                                <i className="fas fa-envelope me-2 text-warning"></i> 
                                                <a href="mailto:admin@dma-caoffice.in" className="text-decoration-none text-white-50 hover-text-white">admin@dma-caoffice.in</a>
                                            </p>
                                            <p className="text-white-50 mb-0 opacity-75 small">
                                                <a href="https://in.linkedin.com/in/dasgupta-maiti-and-associates-07538a372" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-white-50 hover-text-white">
                                                    <i className="fab fa-linkedin me-2 text-warning"></i> LinkedIn Profile
                                                </a>
                                            </p>
                                        </div>
                                    </Col>

                                    {/* MIDDLE: The Form (White Background) */}
                                    <Col lg={6} className="p-5 bg-white">
                                        <h3 className="mb-4 fw-bold" style={{ color: '#002a54' }}>Send us a Message</h3>
                                        <Form onSubmit={handleSubmit}>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="small text-uppercase fw-bold text-muted">Name <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            required
                                                            className="rounded-0 border-top-0 border-start-0 border-end-0 bg-transparent px-0"
                                                            style={{ borderBottom: '1px solid #ddd' }}
                                                            placeholder="Your full name"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="small text-uppercase fw-bold text-muted">Email</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="rounded-0 border-top-0 border-start-0 border-end-0 bg-transparent px-0"
                                                            style={{ borderBottom: '1px solid #ddd' }}
                                                            placeholder="name@example.com"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="small text-uppercase fw-bold text-muted">Phone</Form.Label>
                                                        <Form.Control
                                                            type="tel"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            className="rounded-0 border-top-0 border-start-0 border-end-0 bg-transparent px-0"
                                                            style={{ borderBottom: '1px solid #ddd' }}
                                                            placeholder="+91..."
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4">
                                                        <Form.Label className="small text-uppercase fw-bold text-muted">Topic</Form.Label>
                                                        <Form.Select
                                                            name="service"
                                                            value={formData.service}
                                                            onChange={handleChange}
                                                            className="rounded-0 border-top-0 border-start-0 border-end-0 bg-transparent px-0"
                                                            style={{ borderBottom: '1px solid #ddd' }}
                                                        >
                                                            <option value="">General Inquiry</option>
                                                            {services.slice(0, 3).map(service => (
                                                                <option key={service._id} value={service.title}>{service.title}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-5">
                                                <Form.Label className="small text-uppercase fw-bold text-muted">Message</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    className="rounded-0 border-top-0 border-start-0 border-end-0 bg-transparent px-0"
                                                    style={{ borderBottom: '1px solid #ddd' }}
                                                    placeholder="How can we help?"
                                                />
                                            </Form.Group>

                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="w-100"
                                                style={{
                                                    backgroundColor: '#002a54',
                                                    borderColor: '#002a54',
                                                    color: '#fff',
                                                    padding: '12px',
                                                    borderRadius: '0',
                                                    fontWeight: '600',
                                                    letterSpacing: '1px',
                                                    textTransform: 'uppercase'
                                                }}
                                            >
                                                {loading ? 'Sending...' : 'Send Message'}
                                            </Button>
                                        </Form>
                                    </Col>

                                    {/* RIGHT SIDE: Branch Offices (Dark Theme) */}
                                    <Col lg={3} className="p-4 d-flex flex-column text-white" style={{ backgroundColor: '#002a54' }}>
                                        <div className="mb-4">
                                            <h5 className="fw-bold text-white mb-3">Branches</h5>
                                            <div style={{ width: '30px', height: '3px', backgroundColor: '#D4AF37', marginBottom: '15px' }}></div>
                                        </div>

                                        <div className="mb-4">
                                            <h6 className="fw-bold text-uppercase small mb-2" style={{ letterSpacing: '1px', color: '#D4AF37' }}>Branch Office 1</h6>
                                            <div className="text-white-50 mb-0 opacity-75 small">
                                                Flat-1A, Premise No. 18-0206<br/>
                                                Plot No. CE/1/C/122<br />
                                                Newtown, Rajarhat, Kolkata – 700156<br />
                                                <div className="mt-2 pt-2 border-top border-secondary">
                                                    <span className="fw-bold text-white">Krishnendu Maiti</span><br />
                                                    <a href="tel:+918961401688" className="text-decoration-none text-white-50 hover-text-white">
                                                        <i className="fas fa-phone-alt me-2 text-warning small"></i> +91 89614 01688
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-0">
                                            <h6 className="fw-bold text-uppercase small mb-2" style={{ letterSpacing: '1px', color: '#D4AF37' }}>Branch Office 2</h6>
                                            <div className="text-white-50 mb-0 opacity-75 small">
                                                45E/14A - Gauri Apartment<br/>
                                                Moore Avenue<br />
                                                Manick Bandopadhyay Sarani<br/>
                                                Kolkata – 700040<br />
                                                <div className="mt-2 pt-2 border-top border-secondary">
                                                    <span className="fw-bold text-white">Santanu Chatterjee</span><br />
                                                    <a href="tel:+919051079796" className="text-decoration-none text-white-50 hover-text-white">
                                                        <i className="fas fa-phone-alt me-2 text-warning small"></i> +91 90510 79796
                                                    </a><br />
                                                    <a href="mailto:santanu.chatterjee@dma-caoffice.in" className="text-decoration-none text-white-50 hover-text-white">
                                                        <i className="fas fa-envelope me-2 text-warning small"></i> santanu.chatterjee@dma-caoffice.in
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-auto pt-4 text-end">
                                             <p className="text-white-50 small fst-italic mb-0 opacity-50">
                                                "Integrity. Excellence. Vision."
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Contact;
