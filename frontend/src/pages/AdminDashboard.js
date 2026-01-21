import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Card, Table, Modal, Form, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import api from '../utils/api';


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState([]);
  const [publications, setPublications] = useState([]);
  const [newsroom, setNewsroom] = useState([]);
  const [careers, setCareers] = useState([]);

  const [loading, setLoading] = useState(true);

  // Modals
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showPublicationModal, setShowPublicationModal] = useState(false);
  const [showNewsroomModal, setShowNewsroomModal] = useState(false);
  const [showCareerModal, setShowCareerModal] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [serviceForm, setServiceForm] = useState({ title: '', description: '', seoTitle: '', seoDescription: '', keywords: '', image: null });
  const [publicationForm, setPublicationForm] = useState({ title: '', description: '', keywords: '', file: null, image: null });
  const [newsroomForm, setNewsroomForm] = useState({ title: '', description: '', content: '', date: '', keywords: '', image: null });
  const [careerForm, setCareerForm] = useState({ title: '', description: '', content: '', location: '', department: '', type: 'Full-time', keywords: '', isActive: true, image: null });


  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  const fetchData = useCallback(async () => {
    try {
      const [servicesRes, publicationsRes, newsroomRes, careersRes] = await Promise.all([
        api.get('/services'),
        api.get('/publications'),
        api.get('/newsroom'),
        api.get('/careers')
      ]);
      setServices(servicesRes.data);
      setPublications(publicationsRes.data);
      setNewsroom(newsroomRes.data);
      setCareers(careersRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response?.status === 401) navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, [checkAuth, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // --- Handlers ---
  const handleServiceSubmit = async (e) => { e.preventDefault(); await handleSubmit('services', serviceForm, editingItem, setShowServiceModal, resetServiceForm); };
  const handlePublicationSubmit = async (e) => { e.preventDefault(); await handleSubmit('publications', publicationForm, editingItem, setShowPublicationModal, resetPublicationForm); };
  const handleNewsroomSubmit = async (e) => { e.preventDefault(); await handleSubmit('newsroom', newsroomForm, editingItem, setShowNewsroomModal, resetNewsroomForm); };
  const handleCareerSubmit = async (e) => { e.preventDefault(); await handleSubmit('careers', careerForm, editingItem, setShowCareerModal, resetCareerForm); };



  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      await api.put('/auth/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      toast.success('Password updated successfully');
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating password');
    }
  };

  const handleSubmit = async (endpoint, formData, editItem, setModal, resetForm, isMultipart = true) => {
    const data = isMultipart ? new FormData() : formData;
    if (isMultipart) {
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) data.append(key, formData[key]);
      });
    }

    try {
      if (editItem) {
        await api.put(`/${endpoint}/${editItem._id}`, data, isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : {});
        toast.success('Updated successfully');
      } else {
        await api.post(`/${endpoint}`, data, isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : {});
        toast.success('Created successfully');
      }
      setModal(false);
      resetForm();
      fetchData();
    } catch (error) {
      toast.error('Error processing request');
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // ... (rest of code) ...

  const handleDelete = (type, id) => {
    setItemToDelete({ type, id });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;

    try {
      await api.delete(`/${type}/${id}`);
      toast.success('Deleted successfully');
      
      // Update local state without refetching everything
      if (type === 'services') setServices(prev => prev.filter(item => item._id !== id));
      if (type === 'publications') setPublications(prev => prev.filter(item => item._id !== id));
      if (type === 'newsroom') setNewsroom(prev => prev.filter(item => item._id !== id));
      if (type === 'careers') setCareers(prev => prev.filter(item => item._id !== id));


      setShowDeleteModal(false);
      setItemToDelete(null);
    } catch (error) {
      console.error('Delete error:', error);
      const errorMsg = error.response?.data?.message || 'Error deleting item';
      toast.error(errorMsg);
      
      if (error.response?.status === 401) {
          navigate('/admin/login');
      }
    }
  };

  // Resetters
  const resetServiceForm = () => { setServiceForm({ title: '', description: '', seoTitle: '', seoDescription: '', keywords: '', image: null }); setEditingItem(null); };
  const resetPublicationForm = () => { setPublicationForm({ title: '', description: '', keywords: '', file: null, image: null }); setEditingItem(null); };
  const resetNewsroomForm = () => { setNewsroomForm({ title: '', description: '', content: '', date: '', keywords: '', image: null }); setEditingItem(null); };
  const resetCareerForm = () => { setCareerForm({ title: '', description: '', content: '', location: '', department: '', type: 'Full-time', keywords: '', isActive: true, image: null }); setEditingItem(null); };


  // Open Edit Modals
  const openEditModal = (type, item) => {
    setEditingItem(item);
    if (type === 'service') { setServiceForm({ ...item, image: null }); setShowServiceModal(true); }
    if (type === 'publication') { setPublicationForm({ ...item, image: null, file: null }); setShowPublicationModal(true); }
    if (type === 'newsroom') { setNewsroomForm({ ...item, date: item.date ? new Date(item.date).toISOString().split('T')[0] : '', image: null }); setShowNewsroomModal(true); }
    if (type === 'career') { setCareerForm({ ...item, image: null }); setShowCareerModal(true); }

  }


  // Mobile Sidebar State
  const [showSidebar, setShowSidebar] = useState(false);

  // Close sidebar when route changes or screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setShowSidebar(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div className="d-flex justify-content-center align-items-center vh-100 text-primary"><div className="spinner-border" /></div>;

  return (
    <div className="d-flex min-vh-100 bg-light position-relative overflow-hidden">
      <style>{`
        .sidebar { width: 260px; background: #002147; color: #fff; min-height: 100vh; position: fixed; transition: all 0.3s; z-index: 1050; }
        .sidebar-brand { padding: 20px; font-weight: bold; font-size: 1.2rem; border-bottom: 1px solid rgba(255,255,255,0.1); color: #D4AF37; }
        .sidebar-menu { padding: 20px 0; }
        .menu-item { padding: 12px 20px; cursor: pointer; display: flex; align-items: center; transition: all 0.2s; color: rgba(255,255,255,0.7); }
        .menu-item:hover, .menu-item.active { background: rgba(255,255,255,0.1); color: #fff; border-left: 4px solid #D4AF37; }
        .menu-item i { width: 25px; margin-right: 10px; }
        .main-content { margin-left: 260px; padding: 30px; width: calc(100% - 260px); transition: all 0.3s; }
        
        /* Mobile Styles */
        @media (max-width: 768px) {
          .sidebar { transform: translateX(-100%); }
          .sidebar.show { transform: translateX(0); }
          .main-content { margin-left: 0; width: 100%; padding: 15px; }
          .sidebar-overlay { 
            position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
            background: rgba(0,0,0,0.5); z-index: 1040; display: none; 
          }
          .sidebar-overlay.show { display: block; }
        }

        .stat-card { background: #fff; border-radius: 12px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); transition: transform 0.2s; border-top: 4px solid transparent; }
        .stat-card:hover { transform: translateY(-3px); }
        .stat-card.blue { border-color: #002147; }
        .stat-card.gold { border-color: #D4AF37; }
        .content-card { background: #fff; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: none; overflow: hidden; }
        .btn-add { background: #002147; border: none; border-radius: 8px; padding: 8px 20px; font-weight: 500; }
        .btn-add:hover { background: #00152e; }
        .table-custom th { background: #f8f9fa; border: none; font-weight: 600; text-transform: uppercase; font-size: 0.8rem; color: #666; padding: 15px; }
        .table-custom td { padding: 15px; vertical-align: middle; border-bottom: 1px solid #f0f0f0; }
        .badge-status { padding: 5px 10px; border-radius: 20px; font-weight: 500; font-size: 0.75rem; }
        .badge-status.active { background: #e6f4ea; color: #1e7e34; }
      `}</style>
      
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${showSidebar ? 'show' : ''}`} 
        onClick={() => setShowSidebar(false)}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <div className="sidebar-brand d-flex justify-content-between align-items-center">
          <div>
            <i className="fas fa-shield-alt me-2"></i> ADMIN PANEL <Badge bg="warning" text="dark" className="ms-1" style={{ fontSize: '0.6rem' }}>v1.1</Badge>
          </div>
          <div className="d-md-none cursor-pointer" onClick={() => setShowSidebar(false)}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="sidebar-menu">
          <div className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => { setActiveTab('overview'); setShowSidebar(false); }}>
            <i className="fas fa-th-large"></i> Dashboard
          </div>
          <div className={`menu-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => { setActiveTab('services'); setShowSidebar(false); }}>
            <i className="fas fa-briefcase"></i> Services
          </div>
          <div className={`menu-item ${activeTab === 'publications' ? 'active' : ''}`} onClick={() => { setActiveTab('publications'); setShowSidebar(false); }}>
            <i className="fas fa-book"></i> Publications
          </div>
          <div className={`menu-item ${activeTab === 'newsroom' ? 'active' : ''}`} onClick={() => { setActiveTab('newsroom'); setShowSidebar(false); }}>
            <i className="fas fa-newspaper"></i> Newsroom
          </div>
          <div className={`menu-item ${activeTab === 'careers' ? 'active' : ''}`} onClick={() => { setActiveTab('careers'); setShowSidebar(false); }}>
            <i className="fas fa-user-tie"></i> Careers
          </div>

          <div className="menu-item mt-5 text-danger" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            {/* Mobile Sidebar Toggle */}
            <div className="d-md-none me-3 cursor-pointer p-2" onClick={() => setShowSidebar(true)}>
              <i className="fas fa-bars fa-lg text-dark"></i>
            </div>
            <div>
              <h2 className="fw-bold mb-0 d-none d-sm-block" style={{ color: "#002147" }}>
                {activeTab === 'overview' ? 'Dashboard Overview' :

                    activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              <h4 className="fw-bold mb-0 d-sm-none" style={{ color: "#002147" }}>
                 {activeTab === 'overview' ? 'Dashboard' :

                   activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h4>
              <p className="text-muted small mb-0 d-none d-sm-block">Manage your website content efficiently.</p>
            </div>
          </div>
          <div className="d-flex gap-2 gap-md-3 align-items-center">
            <div className="bg-white px-3 py-2 rounded-pill shadow-sm text-muted d-none d-md-block">
              <i className="far fa-calendar me-2"></i> {new Date().toLocaleDateString()}
            </div>
            <div className="rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm cursor-pointer" style={{ width: "40px", height: "40px", color: "#002147" }} onClick={() => setShowPasswordModal(true)} title="Change Password">
              <i className="fas fa-key"></i>
            </div>
            <div className="rounded-circle bg-white d-flex align-items-center justify-content-center shadow-sm" style={{ width: "40px", height: "40px", color: "#002147" }}>
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'overview' && (
          <Row className="g-4">
            <Col md={3}>
              <div className="stat-card blue">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="text-muted small fw-bold">TOTAL SERVICES</div>
                    <h2 className="fw-bold mb-0 mt-2">{services.length}</h2>
                  </div>
                  <div className="text-primary opacity-25"><i className="fas fa-briefcase fa-2x"></i></div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card gold">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="text-muted small fw-bold">PUBLICATIONS</div>
                    <h2 className="fw-bold mb-0 mt-2">{publications.length}</h2>
                  </div>
                  <div className="text-warning opacity-25"><i className="fas fa-book fa-2x"></i></div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card blue">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="text-muted small fw-bold">OPEN POSITIONS</div>
                    <h2 className="fw-bold mb-0 mt-2">{careers.length}</h2>
                  </div>
                  <div className="text-primary opacity-25"><i className="fas fa-user-tie fa-2x"></i></div>
                </div>
              </div>
            </Col>
            <Col md={3}>
              <div className="stat-card gold">
                <div className="d-flex justify-content-between">
                  <div>
                    <div className="text-muted small fw-bold">NEWS ITEMS</div>
                    <h2 className="fw-bold mb-0 mt-2">{newsroom.length}</h2>
                  </div>
                  <div className="text-warning opacity-25"><i className="fas fa-newspaper fa-2x"></i></div>
                </div>
              </div>
            </Col>
          </Row>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <Card className="content-card">
            <Card.Body>
              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold">All Services</h5>
                <Button className="btn-add" onClick={() => { resetServiceForm(); setShowServiceModal(true); }}><i className="fas fa-plus me-2"></i> Add New</Button>
              </div>
              <Table className="table-custom" hover responsive>
                <thead><tr><th>Title</th><th>Slug</th><th>Image</th><th>Actions</th></tr></thead>
                <tbody>
                  {services.map(item => (
                    <tr key={item._id}>
                      <td><div className="fw-bold">{item.title}</div></td>
                      <td className="text-muted small">{item.slug}</td>
                      <td>
                        {item.imageURL ? (
                          <img src={item.imageURL} alt={item.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        ) : (
                          <span className="text-muted small">No Image</span>
                        )}
                      </td>
                      <td>
                        <Button size="sm" variant="light" className="me-2 text-primary" onClick={() => openEditModal('service', item)}><i className="fas fa-edit"></i></Button>
                        <Button size="sm" variant="light" className="text-danger" onClick={() => handleDelete('services', item._id)}><i className="fas fa-trash"></i></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {/* Publications Tab */}
        {activeTab === 'publications' && (
          <Card className="content-card">
            <Card.Body>
              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold">Publications Library</h5>
                <Button className="btn-add" onClick={() => { resetPublicationForm(); setShowPublicationModal(true); }}><i className="fas fa-plus me-2"></i> Add New</Button>
              </div>
              <Table className="table-custom" hover responsive>
                <thead><tr><th>Title</th><th>Slug</th><th>PDF</th><th>Image</th><th>Actions</th></tr></thead>
                <tbody>
                  {publications.map(item => (
                    <tr key={item._id}>
                      <td><div className="fw-bold">{item.title}</div></td>
                      <td className="text-muted small">{item.slug}</td>
                      <td className="text-center">{item.fileURL ? <i className="fas fa-check text-success"></i> : <i className="fas fa-times text-danger"></i>}</td>
                      <td>
                        {item.imageURL ? (
                          <img src={item.imageURL} alt={item.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        ) : (
                          <span className="text-muted small">No Image</span>
                        )}
                      </td>
                      <td>
                        <Button size="sm" variant="light" className="me-2 text-primary" onClick={() => openEditModal('publication', item)}><i className="fas fa-edit"></i></Button>
                        <Button size="sm" variant="light" className="text-danger" onClick={() => handleDelete('publications', item._id)}><i className="fas fa-trash"></i></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {/* Newsroom Tab */}
        {activeTab === 'newsroom' && (
          <Card className="content-card">
            <Card.Body>
              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold">Newsroom Articles</h5>
                <Button className="btn-add" onClick={() => { resetNewsroomForm(); setShowNewsroomModal(true); }}><i className="fas fa-plus me-2"></i> Add New</Button>
              </div>
              <Table className="table-custom" hover responsive>
                <thead><tr><th>Title</th><th>Date</th><th>Image</th><th>Actions</th></tr></thead>
                <tbody>
                  {newsroom.map(item => (
                    <tr key={item._id}>
                      <td><div className="fw-bold">{item.title}</div></td>
                      <td className="text-muted">{new Date(item.date).toLocaleDateString()}</td>
                      <td>
                        {item.imageURL ? (
                          <img src={item.imageURL} alt={item.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        ) : (
                          <span className="text-muted small">No Image</span>
                        )}
                      </td>
                      <td>
                        <Button size="sm" variant="light" className="me-2 text-primary" onClick={() => openEditModal('newsroom', item)}><i className="fas fa-edit"></i></Button>
                        <Button size="sm" variant="light" className="text-danger" onClick={() => handleDelete('newsroom', item._id)}><i className="fas fa-trash"></i></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {/* Careers Tab */}
        {activeTab === 'careers' && (
          <Card className="content-card">
            <Card.Body>
              <div className="d-flex justify-content-between mb-4">
                <h5 className="fw-bold">Job Postings</h5>
                <Button className="btn-add" onClick={() => { resetCareerForm(); setShowCareerModal(true); }}><i className="fas fa-plus me-2"></i> Add Job</Button>
              </div>
              <Table className="table-custom" hover responsive>
                <thead><tr><th>Title</th><th>Location</th><th>Type</th><th>Actions</th></tr></thead>
                <tbody>
                  {careers.map(item => (
                    <tr key={item._id}>
                      <td><div className="fw-bold">{item.title}</div></td>
                      <td>{item.location}</td>
                      <td><span className="badge bg-light text-dark border">{item.type}</span></td>
                      <td>
                        <Button size="sm" variant="light" className="me-2 text-primary" onClick={() => openEditModal('career', item)}><i className="fas fa-edit"></i></Button>
                        <Button size="sm" variant="light" className="text-danger" onClick={() => handleDelete('careers', item._id)}><i className="fas fa-trash"></i></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}



      </div>

      {/* --- Modals --- */}
      <Modal show={showServiceModal} onHide={() => setShowServiceModal(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>{editingItem ? 'Edit' : 'Add'} Service</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleServiceSubmit}>
            <Form.Group className="mb-3"><Form.Label>Title</Form.Label><Form.Control type="text" value={serviceForm.title} onChange={e => setServiceForm({ ...serviceForm, title: e.target.value })} required /></Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={6} value={serviceForm.description} onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })} required />
              <Form.Text className="text-muted">
                Tip: Start a line with a hyphen (-) or asterisk (*) to create a bullet point. Use **text** to bold phrases.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3"><Form.Label>Service Image</Form.Label><Form.Control type="file" onChange={e => setServiceForm({ ...serviceForm, image: e.target.files[0] })} /></Form.Group>
            <div className="text-end"><Button variant="secondary" className="me-2" onClick={() => setShowServiceModal(false)}>Cancel</Button><Button type="submit" className="btn-add">Save</Button></div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showPublicationModal} onHide={() => setShowPublicationModal(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>{editingItem ? 'Edit' : 'Add'} Publication</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePublicationSubmit}>
            <Form.Group className="mb-3"><Form.Label>Title</Form.Label><Form.Control type="text" value={publicationForm.title} onChange={e => setPublicationForm({ ...publicationForm, title: e.target.value })} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Description</Form.Label><Form.Control as="textarea" rows={3} value={publicationForm.description} onChange={e => setPublicationForm({ ...publicationForm, description: e.target.value })} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>PDF File (Required for New)</Form.Label><Form.Control type="file" accept=".pdf" onChange={e => setPublicationForm({ ...publicationForm, file: e.target.files[0] })} /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Cover Image</Form.Label><Form.Control type="file" accept="image/*" onChange={e => setPublicationForm({ ...publicationForm, image: e.target.files[0] })} /></Form.Group>
            <div className="text-end"><Button variant="secondary" className="me-2" onClick={() => setShowPublicationModal(false)}>Cancel</Button><Button type="submit" className="btn-add">Save</Button></div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showNewsroomModal} onHide={() => setShowNewsroomModal(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>{editingItem ? 'Edit' : 'Add'} News</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewsroomSubmit}>
            <Form.Group className="mb-3"><Form.Label>Title</Form.Label><Form.Control type="text" value={newsroomForm.title} onChange={e => setNewsroomForm({ ...newsroomForm, title: e.target.value })} required /></Form.Group>
            <Form.Group className="mb-3"><Form.Label>Date</Form.Label><Form.Control type="date" value={newsroomForm.date} onChange={e => setNewsroomForm({ ...newsroomForm, date: e.target.value })} required /></Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description (Summary)</Form.Label>
              <Form.Control as="textarea" rows={2} value={newsroomForm.description} onChange={e => setNewsroomForm({ ...newsroomForm, description: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Full Content (Article Body)</Form.Label>
              <Form.Control as="textarea" rows={6} value={newsroomForm.content} onChange={e => setNewsroomForm({ ...newsroomForm, content: e.target.value })} />
              <Form.Text className="text-muted">
                Tip: Start a line with a hyphen (-) or asterisk (*) to create a bullet point. Use **text** to bold phrases.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3"><Form.Label>News Image</Form.Label><Form.Control type="file" onChange={e => setNewsroomForm({ ...newsroomForm, image: e.target.files[0] })} /></Form.Group>
            <div className="text-end"><Button variant="secondary" className="me-2" onClick={() => setShowNewsroomModal(false)}>Cancel</Button><Button type="submit" className="btn-add">Save</Button></div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showCareerModal} onHide={() => setShowCareerModal(false)} size="lg">
        <Modal.Header closeButton><Modal.Title>{editingItem ? 'Edit' : 'Add'} Job</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCareerSubmit}>
            <Form.Group className="mb-3"><Form.Label>Job Title</Form.Label><Form.Control type="text" value={careerForm.title} onChange={e => setCareerForm({ ...careerForm, title: e.target.value })} required /></Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3"><Form.Label>Location</Form.Label><Form.Control type="text" value={careerForm.location} onChange={e => setCareerForm({ ...careerForm, location: e.target.value })} required /></Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3"><Form.Label>Department</Form.Label><Form.Control type="text" value={careerForm.department} onChange={e => setCareerForm({ ...careerForm, department: e.target.value })} /></Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Short Description (Summary)</Form.Label>
              <Form.Control as="textarea" rows={3} value={careerForm.description} onChange={e => setCareerForm({ ...careerForm, description: e.target.value })} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Full Details (Requirements, Responsibilities)</Form.Label>
              <Form.Control as="textarea" rows={6} value={careerForm.content} onChange={e => setCareerForm({ ...careerForm, content: e.target.value })} />
              <Form.Text className="text-muted">Supports basic formatting (hyphens for bullets).</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3"><Form.Label>Keywords (Comma separated)</Form.Label><Form.Control type="text" value={careerForm.keywords} onChange={e => setCareerForm({ ...careerForm, keywords: e.target.value })} placeholder="e.g. tax, audit, junior" /></Form.Group>

            <Form.Group className="mb-3"><Form.Label>Type</Form.Label><Form.Select value={careerForm.type} onChange={e => setCareerForm({ ...careerForm, type: e.target.value })}><option>Full-time</option><option>Part-time</option><option>Contract</option></Form.Select></Form.Group>
            <div className="text-end"><Button variant="secondary" className="me-2" onClick={() => setShowCareerModal(false)}>Cancel</Button><Button type="submit" className="btn-add">Save</Button></div>
          </Form>
        </Modal.Body>
      </Modal>



      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: 'none' }}>
          <Modal.Title className="text-danger fw-bold"><i className="fas fa-exclamation-triangle me-2"></i> Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <p className="lead mb-0">Are you sure you want to delete this item?</p>
          <p className="text-muted small">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none', justifyContent: 'center' }}>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)} className="px-4 rounded-pill">Cancel</Button>
          <Button variant="danger" onClick={confirmDelete} className="px-4 rounded-pill">Delete Permanently</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered className="fade-in-up">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold" style={{ color: '#002147' }}>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="text-center mb-4">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
              <i className="fas fa-lock fa-lg text-warning"></i>
            </div>
            <p className="text-muted small">
              Secure your account by updating your password. <br /> Use a strong password for better security.
            </p>
          </div>

          <Form onSubmit={handlePasswordSubmit}>
            <Form.Group className="mb-4">
              <label className="d-block mb-2 text-uppercase fw-bold small" style={{ letterSpacing: '1px', color: '#666', fontSize: '0.75rem' }}>Current Password</label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword.current ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                  placeholder="Enter current password"
                  className="form-control-lg bg-light ps-3 pe-5"
                  style={{ fontSize: '0.95rem', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: 'none' }}
                />
                <div
                  className="position-absolute cursor-pointer text-muted"
                  style={{ top: '12px', right: '15px', zIndex: 10 }}
                  onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                >
                  <i className={`fas ${showPassword.current ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </div>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <label className="d-block mb-2 text-uppercase fw-bold small" style={{ letterSpacing: '1px', color: '#666', fontSize: '0.75rem' }}>New Password</label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword.new ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                  minLength={6}
                  placeholder="Enter new password (min. 6 chars)"
                  className="form-control-lg bg-light ps-3 pe-5"
                  style={{ fontSize: '0.95rem', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: 'none' }}
                />
                <div
                  className="position-absolute cursor-pointer text-muted"
                  style={{ top: '12px', right: '15px', zIndex: 10 }}
                  onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                >
                  <i className={`fas ${showPassword.new ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </div>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <label className="d-block mb-2 text-uppercase fw-bold small" style={{ letterSpacing: '1px', color: '#666', fontSize: '0.75rem' }}>Confirm New Password</label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword.confirm ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                  placeholder="Re-enter new password"
                  className="form-control-lg bg-light ps-3 pe-5"
                  style={{ fontSize: '0.95rem', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: 'none' }}
                />
                <div
                  className="position-absolute cursor-pointer text-muted"
                  style={{ top: '12px', right: '15px', zIndex: 10 }}
                  onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                >
                  <i className={`fas ${showPassword.confirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </div>
              </div>
            </Form.Group>

            <div className="d-grid mt-4">
              <Button
                type="submit"
                size="lg"
                className="py-3 fw-bold"
                style={{
                  backgroundColor: '#002147',
                  border: 'none',
                  borderRadius: '8px',
                   boxShadow: '0 4px 12px rgba(0,33,71,0.2)'
                }}
              >
                Update Password
              </Button>
            </div>
             <div className="text-center mt-3">
               <button type="button" className="btn btn-link text-muted text-decoration-none small" onClick={() => setShowPasswordModal(false)}>Cancel</button>
             </div>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default AdminDashboard;