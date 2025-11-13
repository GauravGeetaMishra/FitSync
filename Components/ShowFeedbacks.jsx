import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Row,
  Modal,
  Table,
} from "react-bootstrap";
import "../assets/Styles/showuser.css";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Styles/Userlist.css";
import { showFeedbacks } from "../Services/FeedbackService";

export function ShowFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = async () => {
    try {
      const response = await showFeedbacks();
      setFeedbacks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <Container className="userlist-container mt-4">
      {feedbacks.length === 0 ? (
        <h3>
          <Alert variant="warning" className="text-center">
            No Feedbacks till now
          </Alert>{" "}
        </h3>
      ) : (
        <Table
          bordered
          hover
          responsive
          className="user-table mt-3 text-center align-middle"
        >
          <thead className="user-table-header">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feed, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{feed.name}</td>
                  <td>{feed.email}</td>
                  <td>{feed.feedback}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
