import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// Bootstrap components
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { logoutAction } from "../redux/actions/authActions";

export default function AppBarPrimary() {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    account: { role },
    authenticated,
    firstName,
    lastName,
    address,
  } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAction(history));
  };

  return (
    <Navbar expand="lg" sticky="top" variant="dark" style={{ backgroundColor: "#f76f57" }}>
      <div className="container"> 
      <Navbar.Brand as={Link} to="/" className="mx-auto text-white" style={{ fontSize: "24px", fontWeight: "bold" }}>
      GrubExpressDelivery</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {authenticated && (
              <Nav.Link disabled className="text-white" style={{ fontSize: "18px" }}>
                Hello, {firstName} {lastName}
              </Nav.Link>
            )}
            {authenticated ? (
              role === "ROLE_SELLER" ? (
                <>
                  <Nav.Link as={Link} to="/seller/orders" className="text-white" style={{ fontSize: "18px" }}>
                    Seller Dashboard
                  </Nav.Link>
                  <Button variant="outline-light" onClick={handleLogout} style={{ fontSize: "18px" }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/orders" className="text-white" style={{ fontSize: "18px" }}>
                    Orders
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to={{ pathname: "/cart", state: { address: address } }}
                    className="text-white" style={{ fontSize: "18px" }}
                  >
                    Cart
                  </Nav.Link>
                  <Button variant="outline-light" onClick={handleLogout} style={{ fontSize: "18px" }}>
                    Logout
                  </Button>
                </>
              )
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white" style={{ fontSize: "18px" }}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-white" style={{ fontSize: "18px" }}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
