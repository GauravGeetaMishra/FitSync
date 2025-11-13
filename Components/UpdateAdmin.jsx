import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import { showAdminById, updateAdmin } from "../Services/AdminService"; 
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/Styles/RegisterUser.css";

export function UpdateAdmin() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
  });

  const fetchAdminById = async () => {
    try {
      const response = await showAdminById(id);
      if (response.status === 200) {
        setFormData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminById();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(formData);
      const response = await updateAdmin(id, formData);
      if (response.status === 200) {
        // show success message
        toast.success("Admin updated", {
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
        navigate("/showAdmin");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        // show failure message
        toast.error("Something went wrong", {
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
      }
    }
  };
  return (
    <div className="register-page">
    <Container fluid className="register-container">
      <Row className="w-100 justify-content-center">
        <Col lg={8}>
          <Alert variant="success" className="text-center">Update the admin here</Alert>
        </Col>
      </Row><br />
      <Row className="w-100 justify-content-center">
        <Col lg={6}>
          <Form onSubmit={handleSubmit} className="register-form">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter gender"
                name="gender"
                onChange={handleChange}
                value={formData.gender}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Update Admin
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}
