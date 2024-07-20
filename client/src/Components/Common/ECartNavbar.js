import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";    
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown, Button, Form, FormControl } from "react-bootstrap";
import { useNavigate, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function ECartNavbar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getToken = () => {
    return localStorage.getItem("token"); // or sessionStorage.getItem("token")
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token");
        setIsAuthenticated(false);
      }
    }
  }, [navigate]);

  const handleSearch = async () => {
    await axios
      .get("http://localhost:5000/api/product/get", {
        headers: { Authorization: `Bearer ${getToken()}` },
        params: { query: searchTerm },
      })
      .then((res) => {
        navigate("/", { state: { searchData: res.data.products } }); // Pass searchData to Home component
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">E-Cart</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {userRole === "admin" && (
                <>
                  <Nav.Link href="/admin/user">User Controller</Nav.Link>
                  <Nav.Link href="/admin/product">Product Controller</Nav.Link>
                </>
              )}
              <NavDropdown title="Electronics" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/laptop">Laptop</NavDropdown.Item>
                <NavDropdown.Item href="/mobile">Mobile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Desktop</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Tablet</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Cloths" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Mens</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Kids</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Women</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Fashion Sale
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex mx-auto">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-light" onClick={handleSearch}>
                Search
              </Button>
            </Form>
            <Nav className="d-flex gap-3">
              {isAuthenticated ? (
                <Button variant="light" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <>
                  <Button href="/signin" variant="light">
                    Login
                  </Button>
                  <Button href="/signup" variant="light">
                    Sign Up
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ECartNavbar;