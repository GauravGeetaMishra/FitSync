import { Alert, Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { getRole } from "../Services/RoleService";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div>
        {/* Hero Carousel */}
        <Carousel fade interval={3000} className="hero-carousel">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../public/images/Meditation.jpg"
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

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../public/images/Hero6.jpg"
              alt="Gym Motivation"
            />
            <Carousel.Caption>
              <h3>Train. Sweat. Repeat.</h3>
              <p>
                Your body can stand almost anything — it’s your mind you have to
                convince.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="../public/images/Hero5.jpg"
              alt="Fitness Lifestyle"
            />
            <Carousel.Caption>
              <h3>Stay Consistent</h3>
              <p>
                Success starts with self-discipline and ends with persistence.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div id="image-text">
          <div id="first" className="image"></div>
          <div id="text">
            <h1>Strong MindSet Leads Greater Result</h1>
            <p>
              {" "}
              Greatness isn’t built overnight — it’s forged through consistency,
              sweat, and self-control. Push harder every day, and let your
              dedication become your transformation.
            </p>
          </div>
        </div>

        {/* Fitness Cards Section */}
        <Container className="mt-5">
          <h2 className="section-title">Transform Your Fitness Journey</h2>

          <Row className="justify-content-center">
            {[
              {
                title: "Strength Training",
                text: "Build muscle and increase endurance with progressive overload workouts.",
                img: "/public/images/gym.jpg",
              },
              {
                title: "Cardio Blast",
                text: "Improve stamina and burn fat with high-intensity cardio sessions.",
                img: "/public/images/Cardio.jpg",
              },
              {
                title: "Yoga & Flexibility",
                text: "Enhance balance, flexibility, and calmness through mindful yoga.",
                img: "/public/images/Meditation.jpg",
              },
            ].map((item, i) => (
              <Col md={4} key={i}>
                <Card className="fitness-card">
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.text}</Card.Text>
                    {getRole() == "user" ? (
                      <Button
                        variant="outline-light"
                        onClick={() => {
                          navigate("/workout");
                        }}
                      >
                        Explore
                      </Button>
                    ) : null}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div id="bgslide1"></div>

      <Container className="FixedBg">
        <h1>Your Progress Report</h1>
        <ProgressBar now={80} className="custom-progress" />
        <ProgressBar now={50} className="custom-progress" />
        <ProgressBar now={30} className="custom-progress" />
        <ProgressBar now={20} className="custom-progress" />
      </Container>
    </div>
  );
}
