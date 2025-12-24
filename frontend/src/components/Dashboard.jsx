import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import {
  FaUsers,
  FaBuilding,
  FaCalendarWeek,
  FaUserPlus,
  FaSort,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name"); // Default sort
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get("/clients");
        setClients(res.data);
      } catch (err) {
        setError("Failed to load clients");
        toast.error("Could not fetch clients");
      }
    };
    fetchClients();
  }, []);

  // Filtered + Sorted clients
  const processedClients = clients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        client.company.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === "createdAt") {
        aVal = new Date(a.createdAt || 0);
        bVal = new Date(b.createdAt || 0);
      } else {
        aVal = aVal?.toString().toLowerCase() || "";
        bVal = bVal?.toString().toLowerCase() || "";
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this client?")) {
      try {
        await api.delete(`/clients/${id}`);
        setClients(clients.filter((c) => c._id !== id));
        toast.success("Client deleted");
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  return (
    <Container fluid className="p-5">
      {/* Greeting & Stats (same as before) */}

      {/* Add Client Button */}
      <Card className="glass-card mb-5 text-center py-5">
        <Card.Body>
          <FaUserPlus size={60} className="text-info mb-4" />
          <h3>Add a New Client</h3>
          <p className="text-light mb-4">Expand your client database</p>
          <Button
            size="lg"
            className="btn-primary px-5 py-3"
            onClick={() => navigate("/add-client")}
          >
            <FaUserPlus className="me-3" /> Add New Client
          </Button>
        </Card.Body>
      </Card>

      {/* Clients Table */}
      <Card className="glass-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
            <div>
              <h4>All Clients ({processedClients.length})</h4>
              <p className="text-muted">Sort and search your clients</p>
            </div>
            <div className="d-flex gap-3">
              <Form.Control
                type="text"
                placeholder="🔍 Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ minWidth: "250px" }}
              />
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ minWidth: "180px" }}
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="company">Company</option>
                <option value="createdAt">Added Date</option>
              </Form.Select>
              <Button
                variant="outline-light"
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                <FaSort /> {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
              </Button>
            </div>
          </div>

          {processedClients.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-light h5">No clients found</p>
            </div>
          ) : (
            <Table hover className="text-white align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Phone</th>
                  <th>Added Date</th> {/* New Column */}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {processedClients.map((client) => (
                  <tr key={client._id}>
                    <td>
                      <strong>{client.name}</strong>
                    </td>
                    <td>{client.email}</td>
                    <td>{client.company}</td>
                    <td>{client.phone}</td>
                    <td>{formatDate(client.createdAt)}</td>{" "}
                    {/* Formatted Date */}
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/edit-client/${client._id}`)}
                      >
                        Edit
                      </Button>
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
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
