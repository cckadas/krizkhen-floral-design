import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../assets/images/home_bg.jpg";
import "../index.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/home', { state: { email } });
      }
      
      else {
        setError(data.error || "Login failed");
      }
      
    } catch (err) {
      setError("Unable to connect to server");
    }

    setLoading(false);
  };

  return (
    <MDBContainer
      fluid
      className="p-0 m-0"
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <MDBRow className="h-100 g-0">
        {/* Left Image Section */}
        <MDBCol
          md="6"
          className="d-flex align-items-center justify-content-center bg-light"
        >
          <img
            src={backgroundImage}
            className="img-fluid w-100 h-100"
            style={{ objectFit: "cover" }}
            alt="Background"
          />
        </MDBCol>

        {/* Right Login Section */}
        <MDBCol
          md="6"
          className="d-flex flex-column align-items-center justify-content-center p-5"
          style={{
            backgroundColor: "white",
          }}
        >
          <MDBTypography
            className="custom-font text-center"
            style={{
              color: "#D58B9B",
              fontSize: "3.5rem",
              marginBottom: "-0.2rem",
              lineHeight: "1.1", 
            }}
          >
            Krizkhen Floral Design
          </MDBTypography>

          <MDBTypography
            className="mt-2 mb-5 custom-font text-center"
            style={{
              color: "#D58B9B",
              fontSize: "2rem",
              marginTop: "0",
              lineHeight: "1.1", 
            }}
          >
            Sales & Inventory Management System
          </MDBTypography>

          <div style={{ width: "75%" }}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p
              style={{ color: "red", fontSize: "0.9rem", marginBottom: "10px" }}
            >
              {error}
            </p>
          )}

          <MDBBtn
            className="mb-4 w-25 custom-font custom-btn"
            size="lg"
            style={{ backgroundColor: "#A78D79", borderRadius: "8px" }}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginPage;
