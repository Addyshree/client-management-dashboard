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
  Badge,
} from "react-bootstrap";
import {
  FaUserPlus,
  FaSearch,
  FaUsers,
  FaBuilding,
  FaPhone,
  FaBriefcase,
  FaIndustry,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";

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
        setError("Failed to load clients");
        toast.error("Could not fetch clients");
        if (err.response?.status === 401) navigate("/");
      }
    };
    fetchClients();
  }, [navigate]);

  const processedClients = clients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        client.company.toLowerCase().includes(search.toLowerCase()) ||
        (client.industry || "").toLowerCase().includes(search.toLowerCase()) ||
        (client.location || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = a[sortBy] || "";
      let bVal = b[sortBy] || "";
      if (sortBy === "createdAt") {
        aVal = new Date(aVal || 0);
        bVal = new Date(bVal || 0);
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }
      return aVal > bVal ? 1 : -1;
    });

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const variant =
      status === "Active"
        ? "success"
        : status === "Onboarding"
        ? "primary"
        : status === "On-Hold"
        ? "warning"
        : "secondary";
    return <Badge bg={variant}>{status || "Onboarding"}</Badge>;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this client permanently?")) {
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
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <h1
            className="display-5 fw-bold text-center"
            style={{ color: "#e8ebefff" }}
          >
            Prydan Client Management Dashboard
          </h1>
          <p className="text-center text-muted lead">
            Manage your recruitment clients with ease and professionalism
          </p>
        </Col>
      </Row>

      {/* Fixed: Text now white on blue gradient */}
      <Card
        className="text-center mb-5 border-0 shadow-lg"
        style={{ borderRadius: "20px" }}
      >
        <Card.Body
          className="py-5"
          style={{
            background: "linear-gradient(135deg, #001f3f 0%, #00a0b0 100%)",
            color: "white",
          }}
        >
          <FaUserPlus size={70} className="mb-4" />
          <h3 className="mb-3">Start Managing a New Client</h3>
          <p className="mb-4 opacity-75">
            Add client details and track their recruitment journey
          </p>
          <Button
            size="lg"
            variant="light"
            className="px-5 py-3 fw-bold"
            onClick={() => navigate("/add-client")}
            style={{ borderRadius: "50px" }}
          >
            <FaUserPlus className="me-2" /> Add New Client
          </Button>
        </Card.Body>
      </Card>

      {/* Search & Sort */}
      {/* <Row className="mb-4 g-3">
        <Col lg={6}>
          <Form.Label className="fw-bold">
            <FaSearch className="me-2" />
            Search Clients
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Name, email, company, industry, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col lg={3}>
          <Form.Label className="fw-bold">Sort By</Form.Label>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
            <option value="createdAt">Added Date</option>
          </Form.Select>
        </Col>
        <Col lg={3} className="d-flex align-items-end justify-content-end">
          <small className="text-muted">
            Total: <strong>{clients.length}</strong> clients
          </small>
        </Col>
      </Row> */}

      <Row className="mb-4 g-3">
        <Col lg={6}>
          <Form.Label className="fw-bold text-white">
            <FaSearch className="me-2" />
            Search Clients
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Name, email, company, industry, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col lg={3}>
          <Form.Label className="fw-bold text-white">Sort By</Form.Label>
          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="company">Company</option>
            <option value="createdAt">Added Date</option>
          </Form.Select>
        </Col>
        <Col lg={3} className="d-flex align-items-end justify-content-end">
          <small className="text-white">
            Total: <strong>{clients.length}</strong> clients
          </small>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
console.log('API URL:', import.meta.env.VITE_API_URL);
      {/* Table */}
      <Card
        className="shadow border-0"
        style={{ borderRadius: "15px", overflow: "hidden" }}
      >
        <Card.Body className="p-0">
          {processedClients.length === 0 ? (
            <div className="text-center py-5">
              <FaUsers size={100} className="text-muted mb-4" />
              <h5 className="text-muted">No clients found</h5>
              <p>Use the search above or add a new client to begin</p>
            </div>
          ) : (
            <Table hover responsive className="mb-0">
              <thead style={{ backgroundColor: "#001f3f", color: "white" }}>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Service Type</th>
                  <th>Industry</th>
                  <th>Location</th>
                  <th>Added Date</th>
                  <th className="text-center">Actions</th>
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
                    <td>{getStatusBadge(client.status)}</td>
                    <td>{client.serviceType || "Permanent Recruitment"}</td>
                    <td>{client.industry || "IT"}</td>
                    <td>{client.location || "India"}</td>
                    <td>{formatDate(client.createdAt)}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => navigate(`/edit-client/${client._id}`)}
                      >
                        <FaEdit /> Edit
                      </Button>

                      <br />
                      <br />
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(client._id)}
                      >
                        <FaTrashAlt /> Delete
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
