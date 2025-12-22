import React, { useState } from 'react';
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                <title>Contact - Dasgupta Maiti & Associates</title>
                <meta name="description" content="Contact Dasgupta Maiti & Associates for professional Chartered Accountant services in India." />
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
                                    {/* LEFT SIDE: Contact Info */}
                                    <Col lg={5} className="bg-light p-5 border-end border-light d-flex flex-column">
                                        <div className="mb-5">
                                            <h3 className="fw-bold" style={{ color: '#002a54' }}>Contact Information</h3>
                                            <div style={{ width: '40px', height: '3px', backgroundColor: '#D4AF37', marginTop: '15px' }}></div>
                                        </div>

                                        <div className="mb-4">
                                            <h6 className="fw-bold text-dark text-uppercase small mb-2" style={{ letterSpacing: '1px' }}>Headquarters</h6>
                                            <p className="text-muted mb-0">
                                                123 Business Avenue, Suite 400<br />
                                                Kolkata, West Bengal 700001
                                            </p>
                                        </div>

                                        <div className="mb-4">
                                            <h6 className="fw-bold text-dark text-uppercase small mb-2" style={{ letterSpacing: '1px' }}>Branch Offices</h6>
                                            <p className="text-muted mb-0">
                                                New Delhi • Mumbai • Bangalore
                                            </p>
                                        </div>

                                        <div className="mb-5">
                                            <h6 className="fw-bold text-dark text-uppercase small mb-2" style={{ letterSpacing: '1px' }}>Direct Contact</h6>
                                            <p className="text-muted mb-1">
                                                <i className="fas fa-phone-alt me-2 text-warning"></i> +91 33 1234 5678
                                            </p>
                                            <p className="text-muted mb-0">
                                                <i className="fas fa-envelope me-2 text-warning"></i> contact@dma-ca.com
                                            </p>
                                        </div>

                                        <div className="mt-auto">
                                            <p className="text-muted small fst-italic mb-0">
                                                "Integrity. Excellence. Vision."
                                            </p>
                                        </div>
                                    </Col>

                                    {/* RIGHT SIDE: The Form */}
                                    <Col lg={7} className="p-5 bg-white">
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
                                                        <Form.Label className="small text-uppercase fw-bold text-muted">Email <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
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
                                                            <option value="Audit">Audit Service</option>
                                                            <option value="Tax">Tax Consultation</option>
                                                            <option value="Advisory">Financial Advisory</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group className="mb-5">
                                                <Form.Label className="small text-uppercase fw-bold text-muted">Message <span className="text-danger">*</span></Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
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
