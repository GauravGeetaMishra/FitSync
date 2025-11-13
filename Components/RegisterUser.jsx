import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Col,
  Container,
  Form as BootstrapForm,
  Row,
  Alert,
} from "react-bootstrap";
import { signUpSchema } from "../schemas/SignUpSchema";
import { registerUser } from "../Services/UserService";
import { Bounce, toast } from "react-toastify";
import "../Styles/Styles/RegisterUser.css";

export function RegisterUser() {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      const response = await registerUser(values);
      console.log(response);

      if (response.status === 200) {
        toast.success("User Added", { transition: Bounce });
        resetForm(); // clear form after submit
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
              Register the user here
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
                age: "",
                gender: "",
                height_cm: "",
                weight_kg: "",
              }}
              validationSchema={signUpSchema}
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
                    <BootstrapForm.Label>Age</BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="number"
                      placeholder="Enter age"
                      name="age"
                      isInvalid={touched.age && errors.age}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="age" />
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

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Height (cm)</BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="number"
                      placeholder="Enter height"
                      name="height_cm"
                      isInvalid={touched.height_cm && errors.height_cm}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="height_cm" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Weight (kg)</BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="number"
                      placeholder="Enter weight"
                      name="weight_kg"
                      isInvalid={touched.weight_kg && errors.weight_kg}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="weight_kg" />
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
