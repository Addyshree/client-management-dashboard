import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Track if in register mode
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    if (!username || !password) {
      setError("Please provide both username and password");
      return;
    }

    const endpoint = isRegistering ? "/auth/register" : "/auth/login";
    const successMsg = isRegistering
      ? "Registered and logged in successfully!"
      : "Welcome back!";

    try {
      const res = await api.post(endpoint, { username, password });
      localStorage.setItem("token", res.data.token);
      toast.success(successMsg);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.msg ||
        (isRegistering ? "Registration failed" : "Invalid credentials");
      setError(msg);
      toast.error(msg);
      // Do NOT clear fields — keeps user input for convenience
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Container>
        <Row className="align-items-center">
          {/* Left Side - Branding */}
          <Col lg={6} className="text-white text-center text-lg-start">
            <div className="d-inline-flex align-items-center mb-4">
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#00d4ff",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "20px",
                }}
              >
                <FaUsers size={50} color="white" />
              </div>
              <h2 style={{ fontWeight: "700", fontSize: "2.5rem" }}>
                ClientHub
              </h2>
            </div>

            <h1
              style={{
                fontSize: "4rem",
                fontWeight: "800",
                background: "linear-gradient(90deg, #00f2fe, #4facfe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "20px",
              }}
            >
              Manage Your Clients Effortlessly
            </h1>

            <p
              style={{ fontSize: "1.2rem", opacity: 0.9, marginBottom: "40px" }}
            >
              A powerful dashboard to organize, track, and manage all your
              client relationships in one place.
            </p>

            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
              <span
                style={{
                  background: "rgba(0, 242, 254, 0.2)",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  fontWeight: "600",
                }}
              >
                100% Secure
              </span>
              <span
                style={{
                  background: "rgba(0, 242, 254, 0.2)",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  fontWeight: "600",
                }}
              >
                Fast
              </span>
              <span
                style={{
                  background: "rgba(0, 242, 254, 0.2)",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  fontWeight: "600",
                }}
              >
                Real-time
              </span>
              <span
                style={{
                  background: "rgba(0, 242, 254, 0.2)",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  fontWeight: "600",
                }}
              >
                Easy To Use
              </span>
            </div>
          </Col>

          {/* Right Side - Login/Register Card */}
          <Col lg={6} className="d-flex justify-content-center">
            <Card
              style={{
                width: "420px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(15px)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Card.Body className="p-5">
                <h3 className="text-white text-center mb-2">
                  {isRegistering ? "Create Account" : "Welcome back"}
                </h3>
                <p className="text-white opacity-75 text-center mb-4">
                  {isRegistering
                    ? "Register to access your dashboard"
                    : "Enter your credentials to access your dashboard"}
                </p>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.trim())}
                      required
                      style={{
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        color: "white",
                        borderRadius: "12px",
                        padding: "14px 16px",
                        height: "56px",
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                          background: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          color: "white",
                          borderRadius: "12px 0 0 12px",
                          padding: "14px 16px",
                          height: "56px",
                          borderRight: "none",
                        }}
                      />
                      <InputGroup.Text
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          cursor: "pointer",
                          background: "rgba(255, 255, 255, 0.1)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          borderLeft: "none",
                          borderRadius: "0 12px 12px 0",
                          color: "white",
                          height: "56px",
                          width: "56px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {showPassword ? (
                          <FaEyeSlash size={20} />
                        ) : (
                          <FaEye size={20} />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100"
                    style={{
                      background: "linear-gradient(45deg, #00f2fe, #4facfe)",
                      border: "none",
                      borderRadius: "50px",
                      padding: "14px",
                      fontSize: "1.1rem",
                      fontWeight: "600",
                    }}
                  >
                    {isRegistering ? "Create Account →" : "Sign In →"}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <span className="text-white opacity-75">
                    {isRegistering
                      ? "Already have an account?"
                      : "Don't have an account?"}
                  </span>{" "}
                  <Button
                    variant="link"
                    onClick={() => {
                      setIsRegistering(!isRegistering);
                      setError("");
                    }}
                    className="text-info p-0"
                  >
                    {isRegistering ? "Sign in" : "Sign up"}
                  </Button>
                </div>

                <p className="text-center text-white opacity-50 small mt-5">
                  Prydan Consultancy Services © 2025
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
