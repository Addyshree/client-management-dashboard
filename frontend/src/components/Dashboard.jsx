import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Table, Button, Container, Form, Alert } from "react-bootstrap";

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClients(res.data);
      } catch (err) {
        setError("Error fetching clients");
        if (err.response?.status === 401) navigate("/");
      }
    };
    fetchClients();
  }, [navigate]);

  const filteredClients = clients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/clients/${id}`);
        setClients(clients.filter((c) => c._id !== id));
      } catch (err) {
        setError("Error deleting client");
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2>Client Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button onClick={() => navigate("/add-client")} className="mb-3">
        Add New Client
      </Button>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Sort by:</Form.Label>
        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="company">Company</option>
        </Form.Select>
      </Form.Group>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.map((client) => (
            <tr key={client._id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.company}</td>
              <td>{client.phone}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => navigate(`/edit-client/${client._id}`)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(client._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
