import { Col, Container, Row, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Styles/Workout.css";
import "../Styles/Styles/Dashboard.css";
import { useEffect, useState } from "react";
import { showAllWorkouts } from "../Services/WorkoutService";
import { WorkoutCard } from "./WorkoutCard";
import { useNavigate } from "react-router-dom";
import { getRole } from "../Services/RoleService";
export function AboutUs() {
 const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      {/* Hero Carousel */}
      <Carousel fade interval={3000} className="hero-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/Chest.jpg"
            alt="Strength Training"
          />
          <Carousel.Caption>
            <h3>Push Your Limits</h3>
            <p>
              Strength doesn’t come from what you can do — it comes from
              overcoming what you thought you couldn’t.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
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
          Transform Your Fitness Journey with FitSync
        </h2>

        <p style={{ fontSize: "1.05rem", lineHeight: "1.8", color: "#dcdcdc" }}>
          At <strong>FitSync</strong>, we believe fitness isn’t just about
          workouts—it’s about syncing your mind, body, and goals. Whether you’re
          tracking your progress, exploring personalized plans, or finding
          motivation in a community that inspires you, FitSync is your companion
          in achieving lasting transformation.
        </p>
        {getRole()=="user" ? <Button
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
        </Button> : null}
        
      </Container>
      <div style={{ marginTop: "50px" }}>
        <Container style={{ margin: "auto" }}>
          <Row className="justify-content-center text-center">
            <Col xs={12} md={4} className="mt-5">
              <Image
                src="/images/goutam.jpg"
                roundedCircle
                style={{
                  height: "20rem",
                  width: "20rem",
                  boxShadow: "0px 0px 15px rgba(0, 123, 255, 0.7)",
                }}
              />
              <h3 className="mt-3">Goutam Soni</h3>
              <hr className="team-hr" />
            </Col>

            <Col xs={12} md={4} className="mt-5">
              <Image
                src="/images/Gaurav.jpeg"
                roundedCircle
                style={{
                  height: "20rem",
                  width: "20rem",
                  boxShadow: "0px 0px 15px rgba(0, 123, 255, 0.7)",
                }}
              />
              <h3 className="mt-3">Gaurav Mishra</h3>
              <hr className="team-hr" />
            </Col>

            <Col xs={12} md={4} className="mt-5">
              <Image
                src="/images/ss.png"
                roundedCircle
                style={{
                  height: "20rem",
                  width: "20rem",
                  boxShadow: "0px 0px 15px rgba(0, 123, 255, 0.7)",
                }}
              />
              <h3 className="mt-3">Shital Sable</h3>
              <hr className="team-hr" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}