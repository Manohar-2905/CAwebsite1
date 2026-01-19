import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import api from '../utils/api';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState({ services: [], publications: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setLoading(false);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    try {
      const response = await api.get(`/search?q=${encodeURIComponent(searchQuery)}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Search Results{query ? `: ${query}` : ''} - CA Consultancy</title>
      </Helmet>

      <section className="section-padding">
        <Container className="fade-in-up">
          <h1 className="mb-4">Search Results{query && `: "${query}"`}</h1>

          {loading ? (
            <div className="text-center">Searching...</div>
          ) : (
            <>
              {results.services.length === 0 && results.publications.length === 0 ? (
                <p>No results found for "{query}"</p>
              ) : (
                <>
                  {results.services.length > 0 && (
                    <div className="mb-5">
                      <h2 className="mb-3">Services ({results.services.length})</h2>
                      <Row>
                        {results.services.map((service) => (
                          <Col md={4} key={service._id} className="mb-3">
                            <Card>
                              {service.imageURL && (
                                <Card.Img variant="top" src={service.imageURL} style={{ height: '150px', objectFit: 'cover' }} />
                              )}
                              <Card.Body>
                                <Card.Title>{service.title}</Card.Title>
                                <Card.Text>{service.description.substring(0, 100)}...</Card.Text>
                                <Button as={Link} to={`/services/${service.slug}`} variant="primary" size="sm">
                                  View Service
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}

                  {results.publications.length > 0 && (
                    <div>
                      <h2 className="mb-3">Publications ({results.publications.length})</h2>
                      <Row>
                        {results.publications.map((publication) => (
                          <Col md={4} key={publication._id} className="mb-3">
                            <Card>
                              <Card.Body>
                                <Card.Title>{publication.title}</Card.Title>
                                <Card.Text>{publication.description.substring(0, 100)}...</Card.Text>
                                <Button as={Link} to={`/publications/${publication.slug}`} variant="primary" size="sm">
                                  View Publication
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
};

export default SearchResults;
