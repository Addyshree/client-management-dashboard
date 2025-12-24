import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await api.get("/clients");
        const found = res.data.find((c) => c._id === id);
        if (found) setClient(found);
      } catch (err) {
        toast.error("Failed to load client");
      }
    };
    fetchClient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clients/${id}`, client);
      toast.success("Client updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to update client");
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
            <h2 className="glowing-text mb-0">Edit Client</h2>
          </div>
          <p className="text-light mb-5">
            Update the client's information below
          </p>

          <Form onSubmit={handleSubmit}>
            {/* Same form structure as AddClient, but with value={client.xxx} and onChange updating client */}
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
                      value={client.name}
                      onChange={(e) =>
                        setClient({ ...client, name: e.target.value })
                      }
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="text-white">
                    <FaEnvelope className="me-2" /> Email
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      value={client.email}
                      onChange={(e) =>
                        setClient({ ...client, email: e.target.value })
                      }
                      required
                    />
                  </InputGroup>
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
                      value={client.company}
                      onChange={(e) =>
                        setClient({ ...client, company: e.target.value })
                      }
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-5">
                  <Form.Label className="text-white">
                    <FaPhone className="me-2" /> Phone
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaPhone />
                    </InputGroup.Text>
                    <Form.Control
                      type="tel"
                      value={client.phone}
                      onChange={(e) =>
                        setClient({ ...client, phone: e.target.value })
                      }
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid">
              <Button type="submit" size="lg" className="btn-primary py-3">
                Update Client
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditClient;
