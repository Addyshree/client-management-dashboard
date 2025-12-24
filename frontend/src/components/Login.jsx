import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.msg || "Login failed";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100 p-4"
    >
      <Row className="w-100">
        <Col lg={6} className="d-none d-lg-block text-center">
          <h1 className="glowing-text mb-4">
            Manage Your Clients Effortlessly
          </h1>
          <p className="lead text-light opacity-75 mb-5">
            A powerful dashboard to organize, track, and manage all your client
            relationships in one place.
          </p>
          <div>
            <span className="highlight-badge">100% Secure</span>
            <span className="highlight-badge">Fast</span>
            <span className="highlight-badge">Real-time</span>
            <span className="highlight-badge">Easy To Use</span>
          </div>
        </Col>
        <Col
          lg={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Card className="glass-card p-5" style={{ width: "400px" }}>
            <Card.Body>
              <h3 className="text-center mb-2">Welcome back</h3>
              <p className="text-center text-muted mb-4">
                Enter your credentials to access your dashboard
              </p>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="you@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="bg-transparent text-white border-light"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-transparent text-white border-light"
                  />
                </Form.Group>
                <Button type="submit" className="w-100 btn-primary">
                  Sign In →
                </Button>
              </Form>
              <p className="text-center mt-4 text-muted small">
                Don't have an account?{" "}
                <Button variant="link" className="p-0 text-info">
                  Sign up
                </Button>
              </p>
              <p className="text-center text-muted small mt-5">
                Prydan Consultancy Services © 2025
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
