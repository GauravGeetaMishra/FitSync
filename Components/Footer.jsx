import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "../Styles/Styles/Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="align-items-center text-center">
          <Col lg={4} md={4} sm={12}>
            <span>Contact: 3208284022</span>
          </Col>
          <Col lg={4} md={4} sm={12}>
            <h3 className="footer-title">FitSync</h3>
          </Col>
          <Col lg={4} md={4} sm={12}>
            <span>Email: fitsync@gmail.com</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
