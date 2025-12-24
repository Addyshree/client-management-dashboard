import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaPhone,
  FaArrowLeft,
} from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const AddClient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/clients", { name, email, company, phone });
      toast.success("Client added successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add client");
    }
  };

  return (
    <Container fluid className="p-5 d-flex justify-content-center">
      <Card className="glass-card" style={{ maxWidth: "700px", width: "100%" }}>
        <Card.Body className="p-5">
          <div className="d-flex align-items-center mb-4">
            <Button
              variant="link"
              onClick={() => navigate("/dashboard")}
              className="text-white p-0 me-3"
            >
              <FaArrowLeft size={24} />
            </Button>
            <h2 className="glowing-text mb-0">Add New Client</h2>
          </div>
          <p className="text-light mb-5">
            Fill in the details below to add a new client to your database
          </p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-white">
                    <FaUser className="me-2" /> Full Name
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="e.g., John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Client's full name
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-white">
                    <FaEnvelope className="me-2" /> Email Address
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <Form.Text className="text-muted">
                    We'll use this to contact them
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-white">
                    <FaBuilding className="me-2" /> Company
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaBuilding />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="e.g., ABC Corporation"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Company they work for
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-5">
                  <Form.Label className="text-white">
                    <FaPhone className="me-2" /> Phone Number
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaPhone />
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Best contact number
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid">
              <Button type="submit" size="lg" className="btn-primary py-3">
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
