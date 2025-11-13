import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Styles/Workout.css";
import { getWorkout } from "../Services/WorkoutService";
import { setUserWorkout } from "../Services/userWorkoutService";
import { Bounce, toast } from "react-toastify";

export function Do_Workout() {
  const { user_id, workout_id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState([]);

  const fetchWorkout = async () => {
    try {
      const response = await getWorkout(workout_id);
      setWorkout(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWorkout();
  }, []);

  const handleDoClick = async () => {
    try {
      const response = await setUserWorkout(user_id, workout_id, workout);
      if (response.status === 200) {
        toast.success("Workout started!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        navigate("/workout");
      }
    } catch (error) {
        console.log(error);
    }
  };

  const handleBackClick = () => {
    navigate("/workout");
  };

  return (
    <div id="do-workout" style={{height:"70vh", marginTop:"50px"}}>
      <Container className="mt-20">
        <Row className="text-center " style={{marginTop:"50px"}}>
          <Col md={4} className="text-center" style={{ margin: "auto" }}>
            <Card className="fitness-card text-center">
              <Card.Img
                variant="top"
                src={`/images/${workout.category}.jpg`}
                alt={workout.name}
              />
              <Card.Body>
                <Card.Title>{workout.name}</Card.Title>
                <Card.Text>{workout.description}</Card.Text>
                <Row>
                  <Button variant="outline-light" onClick={handleDoClick}>
                    Do Now!
                  </Button>
                </Row>
                <Row className="mt-2">
                  <Button variant="outline-light" onClick={handleBackClick}>
                    Back
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
