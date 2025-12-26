import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Container, Card, Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { 
  FaUser, 
  FaEnvelope, 
  FaBuilding, 
  FaPhone, 
  FaBriefcase, 
  FaIndustry, 
  FaMapMarkerAlt, 
  FaArrowLeft,
  FaUserPlus 
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AddClient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    status: 'Onboarding',
    serviceType: 'Permanent Recruitment',
    industry: 'IT',
    location: 'India'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clients', formData);
      toast.success('Client added successfully!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Failed to add client');
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card style={{ maxWidth: '800px', width: '100%' }} className="shadow">
        <Card.Body className="p-5">
          <div className="d-flex align-items-center mb-4">
            <Button variant="link" onClick={() => navigate('/dashboard')} className="p-0 me-3 text-dark">
              <FaArrowLeft size={24} />
            </Button>
            <h2>Add New Client Account</h2>
          </div>
          <p className="text-muted mb-5">Enter details for the new recruitment client</p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label><FaUser className="me-2" />Full Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="e.g., John Doe"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                    <Form.Control
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@company.com"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label><FaBuilding className="me-2" />Company</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaBuilding /></InputGroup.Text>
                    <Form.Control
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      placeholder="e.g., ABC Corporation"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label><FaPhone className="me-2" />Phone</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaPhone /></InputGroup.Text>
                    <Form.Control
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label><FaBriefcase className="me-2" />Service Type</Form.Label>
                  <Form.Select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                  >
                    <option value="Permanent Recruitment">Permanent Recruitment</option>
                    <option value="Contract Staffing">Contract Staffing</option>
                    <option value="RPO">RPO</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Onboarding">Onboarding</option>
                    <option value="Active">Active</option>
                    <option value="On-Hold">On-Hold</option>
                    <option value="Contract Ended">Contract Ended</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label><FaIndustry className="me-2" />Industry</Form.Label>
                  <Form.Select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                  >
                    <option value="IT">IT</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-5">
                  <Form.Label><FaMapMarkerAlt className="me-2" />Location</Form.Label>
                  <Form.Select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  >
                    <option value="India">India</option>
                    <option value="UK">UK</option>
                    <option value="USA">USA</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid">
              <Button 
                type="submit" 
                size="lg" 
                style={{ backgroundColor: '#001f3f', border: 'none' }}
                className="py-3"
              >
                <FaUserPlus className="me-2" /> Save Client
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddClient;