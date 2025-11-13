import React from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Styles/Workout.css";
import { getId } from "../Services/IdService";
import { useNavigate } from "react-router-dom";
export function WorkoutCard(props) {
  const navigate = useNavigate()
  const workout_id = props.Id;
  const user_id =  getId();
  
  const handleClick = ()=>{
    navigate(`/workout/${user_id}/${workout_id}`);
  }

  return (
      <Col md={4}>
        <Card className="fitness-card">
          <Card.Img variant="top" src={props.img} alt={props.title} />
          <Card.Body className="text-center">
            <Card.Title>{props.title}</Card.Title>
            
            <Button variant="outline-light" onClick={handleClick}>Get Started</Button>
          </Card.Body>
        </Card>
      </Col>
  );
}
