import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Form, Button, Container, Alert } from "react-bootstrap";

const EditClient = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await api.get(`/clients`);
        const client = res.data.find((c) => c._id === id);
        if (client) {
          setName(client.name);
          setEmail(client.email);
          setCompany(client.company);
          setPhone(client.phone);
        } else {
          setError("Client not found");
        }
      } catch (err) {
        setError("Error fetching client");
      }
    };
    fetchClient();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clients/${id}`, { name, email, company, phone });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Error updating client");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Edit Client</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">
          Update Client
        </Button>
      </Form>
    </Container>
  );
};

export default EditClient;
