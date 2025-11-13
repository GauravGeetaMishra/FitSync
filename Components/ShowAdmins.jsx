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
import { showAllAdmin, deleteAdmin } from "../Services/AdminService"; 
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "../assets/Styles/showuser.css";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Styles/Userlist.css";

export function ShowAdmins() {
  const [admins, setAdmins] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const navigate = useNavigate();

  const fetchAdmins = async () => {
    try {
      const response = await showAllAdmin();
      setAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAdmins();
  }, []);

  const hideConfirmation = () => {
    setShowConfirmation(false);
  };

  const showSuccessToast = () => {
    toast.success("Admin deleted", {
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

  const handleAdminDelete = async () => {
    try {
      if (selectedAdmin) {
        const response = await deleteAdmin(selectedAdmin.id);
        if (response.status === 200) {
          showSuccessToast();
          const remainingAdmin = admins.filter((p) => {
            return p.id !== selectedAdmin.id;
          });
          setAdmins(remainingAdmin);
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
    <Container className="userlist-container1 mt-4">
      <Row>
        <Col lg={12}>
          <Alert variant="success" className="userlist-alert text-center">
            View all the admins here
          </Alert>
        </Col>
      </Row>
      {admins.length === 0 ? (
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
              <th>Gender</th>
              <th>Joined at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.gender}</td>
                  <td>{admin.created_at}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      className="action-button delete-btn"
                      onClick={() => {
                        setShowConfirmation(true);
                        setSelectedAdmin(admin);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="action-button edit-btn"
                      onClick={() => {
                        navigate(`/edit-admin/${admin.id}`);
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
      <Row >
        <Button variant="success" onClick={()=>{
            navigate("/admin-register")
        }}>Register New</Button>
      </Row>
      <Modal show={showConfirmation} onHide={hideConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to delete the{" "}
          <strong>{selectedAdmin ? selectedAdmin.name : ""}</strong> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideConfirmation}>
            No
          </Button>
          <Button variant="danger" onClick={handleAdminDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
