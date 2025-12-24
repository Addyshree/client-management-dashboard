import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (!token) return null;

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      style={{ backgroundColor: "#4b0082" }}
    >
      {" "}
      // Prydan-inspired purple
      <Container>
        <Navbar.Brand href="/dashboard">
          {/* <img
            src="https://www.freepik.com/free-vector/bird-colorful-gradient-design-vector_35322171.htm#fromView=keyword&page=1&position=0&uuid=6be166b5-fc4e-4a74-bf1f-51fface0922f&query=Logo+svg" // Placeholder from search; replace if needed
            alt="Prydan Logo"
            style={{ width: "50px", marginRight: "10px" }}
          /> */}
          Prydan Client Management
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
