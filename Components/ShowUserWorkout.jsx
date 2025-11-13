import React, { useEffect, useState } from "react";
import { getId } from "../Services/IdService";
import { getUserWorkout } from "../Services/userWorkoutService";
import { Button, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function ShowUserWorkout() {
  const navigate = useNavigate();
  const user_id = getId();

  const [userWorkout, setUserWorkout] = useState([]);
  const fetchUserWorkout = async () => {
    try {
      const response = await getUserWorkout(user_id);
      setUserWorkout(response.data.row[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserWorkout();
  }, []);
  
  return (
    <Container style={{height:"70vh"}}>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Total workout(min)</th>
              <th>Total Calories(burn)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userWorkout.name}</td>
              <td>{userWorkout.age}</td>
              <td>{userWorkout.gender}</td>
              <td>{userWorkout.total_workout}</td>
              <td>{userWorkout.total_calories_burn}</td>
              
            </tr>
          </tbody>
          
        </Table>
       
      </Row>
    </Container>
  );
}
