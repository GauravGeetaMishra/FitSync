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
import { getAllUsers, deleteUser } from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../assets/Styles/showuser.css";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Styles/Userlist.css";

export function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const hideConfirmation = () => {
    setShowConfirmation(false);
  };

  const showSuccessToast = () => {
    toast.success("User deleted", {
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
  };

  const showErrorToast = () => {
    toast.error("User deletion failed", {
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
  };

  const handleUserDelete = async () => {
    try {
      if (selectedUser) {
        const response = await deleteUser(selectedUser.id);
        if (response.status === 200) {
          showSuccessToast();
          const remainingUser = users.filter((p) => {
            return p.id !== selectedUser.id;
          });
          setUsers(remainingUser);
        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        showErrorToast();
      }
    } finally {
      setShowConfirmation(false);
    }
  };

  return (
    <Container className="userlist-container mt-4">
      <Row>
        <Col lg={12}>
          <Alert variant="success" className="userlist-alert text-center">
            View all the users here
          </Alert>
        </Col>
      </Row>
      {users.length === 0 ? (
        <h3>
          <Alert variant="warning" className="text-center">
            No users found
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
              <th>Age</th>
              <th>Gender</th>
              <th>Height (cm)</th>
              <th>Weight (kg)</th>
              <th>Joined at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>{user.height_cm}</td>
                  <td>{user.weight_kg}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      className="action-button delete-btn"
                      onClick={() => {
                        setShowConfirmation(true);
                        setSelectedUser(user);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="action-button edit-btn"
                      onClick={() => {
                        navigate(`/edit-user/${user.id}`);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
      <Modal show={showConfirmation} onHide={hideConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to delete the{" "}
          <strong>{selectedUser ? selectedUser.name : ""}</strong> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideConfirmation}>
            No
          </Button>
          <Button variant="danger" onClick={handleUserDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
