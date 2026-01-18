import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import api from '../utils/api';

const PublicationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfEmbedUrl, setPdfEmbedUrl] = useState('');

  const fetchPublication = useCallback(async () => {
    try {
      const response = await api.get(`/publications/${slug}`);
      setPublication(response.data);
      const rawUrl = response.data.fileURL || '';
      const httpsUrl = rawUrl.replace(/^http:/, 'https:');
      // Use Google viewer for consistent inline preview across browsers
      setPdfEmbedUrl(`https://docs.google.com/viewer?url=${encodeURIComponent(httpsUrl)}&embedded=true`);
    } catch (error) {
      console.error('Error fetching publication:', error);
      navigate('/publications');
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  useEffect(() => {
    fetchPublication();
  }, [fetchPublication]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!publication) {
    return null;
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: publication.title,
    description: publication.description,
    author: {
      '@type': 'Organization',
      name: 'CA Consultancy'
    }
  };

  const pdfUrl = (publication?.fileURL || '').replace(/^http:/, 'https:');

  return (
    <>
      <Helmet>
        <title>{publication.title} - CA Consultancy</title>
        <meta name="description" content={publication.description.substring(0, 160)} />
        <meta name="keywords" content={publication.keywords.join(', ')} />
        <meta property="og:title" content={publication.title} />
        <meta property="og:description" content={publication.description.substring(0, 160)} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <section className="section-padding">
        <Container>
          <div id="publication-content">
            <Row>
              <Col md={12} className="fade-in-up">
                <h1 className="mb-4">{publication.title}</h1>
                <div
                  className="publication-description mb-4"
                  dangerouslySetInnerHTML={{ __html: publication.description.replace(/\n/g, '<br />') }}
                />
                {pdfUrl && (
                  <div className="mt-4">
                    {/* Action Buttons */}
                    <div className="mb-4 d-flex gap-3">
                      <Button 
                        variant="primary" 
                        size="lg"
                        className="px-4"
                        onClick={() => {
                          const link = document.createElement('a');
                           link.href = pdfUrl;
                          link.download = `${publication.title.replace(/\s+/g, '-')}.pdf`;
                          link.target = '_blank';
                          link.rel = 'noopener noreferrer';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <i className="fas fa-download me-2"></i>
                        Download PDF
                      </Button>
                    </div>

                    {/* PDF Preview */}
                     <div className="pdf-preview border rounded shadow-sm overflow-hidden" style={{ height: '800px', backgroundColor: '#f8f9fa' }}>
                      <iframe
                        src={pdfEmbedUrl}
                        title={publication.title}
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                      >
                        <div className="d-flex align-items-center justify-content-center h-100 flex-column">
                            <p className="mb-3">This browser does not support PDF preview.</p>
                            <Button variant="primary" href={publication.fileURL} download>Download PDF to View</Button>
                        </div>
                      </iframe>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default PublicationDetail;
