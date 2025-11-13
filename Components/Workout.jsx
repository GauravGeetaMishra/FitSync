import { Button, Col, Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Styles/Workout.css";
import "../Styles/Styles/Dashboard.css";
import { useEffect, useState } from "react";
import { showAllWorkouts } from "../Services/WorkoutService";
import { WorkoutCard } from "./WorkoutCard";
import { useNavigate } from "react-router-dom";
export function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();
  const fetchWorkout = async () => {
    try {
      const response = await showAllWorkouts();
      setWorkouts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWorkout();
  }, []);


  return (
    <div className="workout-page">
      <Carousel fade interval={3000} className="hero-carousel">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/Hero3.jpg"
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
      <Container className="mt-5">
        <h2 className="section-title text-center text-light">
          Transform Your Fitness Journey
        </h2>
        <Col lg={12} className="text-center mb-5">
          <Button variant="success" onClick={()=>{navigate("/showUserWorkout")}} >Check your todays workout here</Button>
        </Col>
        <Row className="justify-content-center">
          {workouts.map((workout) => (
            <WorkoutCard
              Id = {workout.workout_id}
              title={workout.name}
              text={workout.description}
              img={`/images/${workout.category}.jpg`}
            />
          ))}
        </Row>
      </Container>
      <div id="bgslide"></div>
      <div id="Motivating">
        <h1>Unleash Your Power</h1>
      </div>
      <div id="image-text">
        <div id="first" className="image">
          
        </div>
        <div id="text">
          <h1>Discipline. Dedication. Domination</h1>
          <p>
            Success begins in the mind — every lift, every stride, every rep
            starts with belief. Build your strength, sharpen your focus, and let
            consistency shape the champion within.
          </p>
        </div>
      </div>
    </div>
  );
}
