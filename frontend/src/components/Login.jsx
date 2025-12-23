import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Form, Button, Container, Alert } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Error logging in");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">
          Login
        </Button>
      </Form>
      <p className="mt-3">Don't have an account? Register below (for demo).</p>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await api.post("/auth/register", {
              username,
              password,
            });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
          } catch (err) {
            setError(err.response?.data?.msg || "Error registering");
          }
        }}
      >
        <Button type="submit" variant="secondary" className="mt-2">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
