import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { getRole } from "../Services/RoleService";

export function Gallery() {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "50px" }}>
      <Row>
        <Col>
          <Card
            style={{ width: "18rem", overflow: "hidden", marginTop: "10px" }}
          >
            <Card.Img
              variant="top"
              src="/images/Gallery1.jpg"
              style={{ height: "350px", borderRadius: "10px" }}
            />
            <Card.Body>
              <Card.Title style={{ color: "blue", fontWeight: "700" }}>
                {" "}
                STRENGTH
              </Card.Title>
              <Card.Text>
                Strength is built step by step, with every rep and every ounce
                of effort you give.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{ width: "18rem", overflow: "hidden", marginTop: "10px" }}
          >
            <Card.Img
              variant="top"
              src="/images/gym.jpg"
              style={{ height: "350px", borderRadius: "10px" }}
            />
            <Card.Body>
              <Card.Title style={{ color: "blue", fontWeight: "700" }}>
                {" "}
                MINDSET
              </Card.Title>
              <Card.Text>
                A strong mindset turns challenges into fuel and drives you
                toward your best self.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{ width: "18rem", overflow: "hidden", marginTop: "10px" }}
          >
            <Card.Img
              variant="top"
              src="/images/LongPic.jpg"
              style={{ height: "350px", borderRadius: "10px" }}
            />
            <Card.Body>
              <Card.Title style={{ color: "blue", fontWeight: "700" }}>
                VISION
              </Card.Title>
              <Card.Text>
                Vision keeps you moving forward, even when the path seems hard
                to see ahead.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{ width: "18rem", overflow: "hidden", marginTop: "10px" }}
          >
            <Card.Img
              variant="top"
              src="/images/ImgSection.jpg"
              style={{ height: "350px", borderRadius: "10px" }}
            />
            <Card.Body>
              <Card.Title style={{ color: "blue", fontWeight: "700" }}>
                SUCCESS
              </Card.Title>
              <Card.Text>
                Success comes from consistency, focus, and never giving up on
                your fitness goals.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Container
        className="text-center mt-5 p-5 rounded"
        style={{
          background: "linear-gradient(145deg, #0f0f0f, #1c1c1c)",
          color: "#f5f5f5",
          maxWidth: "900px",
        }}
      >
        <h2
          className="fw-bold mb-4"
          style={{ color: "#00b4d8", fontSize: "2rem" }}
        >
          Built Different. Trained Together.
        </h2>
        {getRole() == "user" ? (
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => navigate("/workout")}
            style={{
              backgroundColor: "#00b4d8",
              border: "none",
              borderRadius: "25px",
              padding: "10px 28px",
              fontSize: "1rem",
            }}
          >
            Get Started
          </Button>
        ) : null}
      </Container>
    </div>
  );
}
