import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Bounce, toast } from "react-toastify";
import { getUser, updateUser } from "../Services/UserService";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/Styles/RegisterUser.css";

export function UpdateUser() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    height_cm: "",
    weight_kg: "",
  });

  const fetchUserById = async () => {
    try {
      const response = await getUser(id);
      if (response.status === 200) {
        setFormData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserById();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(formData);
      const response = await updateUser(id, formData);
      console.log(response);
      if (response.status === 200) {
        // show success message        
        toast.success("User updated", {
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
        navigate("/showUser");
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
          <Alert variant="success" className="text-center">Update the user here</Alert>
        </Col>
      </Row>
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
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="age"
                onChange={handleChange}
                value={formData.age}
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

            <Form.Group className="mb-3">
              <Form.Label>Height</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Height"
                name="height_cm"
                onChange={handleChange}
                value={formData.height_cm}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter weight"
                name="weight_kg"
                onChange={handleChange}
                value={formData.weight_kg}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Update User
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}
