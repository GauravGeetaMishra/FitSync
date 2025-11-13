import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Col,
  Container,
  Form as BootstrapForm,
  Row,
  Alert,
} from "react-bootstrap";
import { registerSchema } from "../schemas/RegisterSchema"; 
import { registerAdmin } from "../Services/AdminService"; 
import { Bounce, toast } from "react-toastify";
import "../Styles/Styles/RegisterUser.css";
import { useNavigate } from "react-router-dom";

export function RegisterAdmin() {
    const navigate = useNavigate();
  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      const response = await registerAdmin(values);
      console.log(response);

      if (response.status === 200) {
        toast.success("Admin Added", { transition: Bounce });
        resetForm(); // clear form after submit
        navigate("/showAdmin");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { transition: Bounce });
    }
  };

  return (
    <div className="register-page">
      <Container className="mt-3 register-container">
        <Row className="w-100 justify-content-center">
          <Col lg={8}>
            <Alert variant="success" className="text-center">
              Register the admin here
            </Alert>
          </Col>
        </Row>

        <Row className="w-100 justify-content-center">
          <Col lg={6}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                gender: "",
              }}
              validationSchema={registerSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, dirty, isValid }) => (
                <BootstrapForm as={Form} className="register-form">
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Name</BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="text"
                      placeholder="Enter name"
                      name="name"
                      isInvalid={touched.name && errors.name}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="name" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Email</BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      isInvalid={touched.email && errors.email}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="email" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      isInvalid={touched.password && errors.password}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="password" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Gender</BootstrapForm.Label>
                    <div>
                      <label className="me-3">
                        <Field type="radio" name="gender" value="Male" /> Male
                      </label>
                      <label>
                        <Field type="radio" name="gender" value="Female" />{" "}
                        Female
                      </label>
                    </div>
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="gender" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={!(dirty && isValid)}
                  >
                    Submit
                  </Button>
                </BootstrapForm>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
