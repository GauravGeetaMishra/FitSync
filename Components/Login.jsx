import { useEffect } from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import {
  Button,
  Col,
  Container,
  Form as BootstrapForm,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { login } from "../Services/LoginService";
import { getToken, storeToken } from "../Services/TokenService";
import { storeRole } from "../Services/RoleService";
import { storeEmail } from "../Services/EmailService";
import { storeId } from "../Services/IdService";
import { loginSchema } from "../schemas/LoginSchemas";
import "../Styles/Styles/LoginForm.css";

export function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = async (values) => {
    try {
      const response = await login(values);
      if (response.status === 200) {
        storeToken(response.data.token);
        storeRole(values.role);
        storeId(response.data.id);
        storeEmail(values.email);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        (error.response.status === 400 || error.response.status === 500)
      ) {
        toast.error(error.response.data.message, {
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
    <div id="form">
      <Row>
      <h1>FitSync</h1>

      </Row>
      <Container className="mt-3 form-container">
        <Row className="justify-content-center">
          <Col lg={6}>
            <Formik
              initialValues={{ email: "", password: "", role: "" }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, dirty, isValid, handleChange, values }) => (
                <FormikForm as={BootstrapForm} className="login-form">
                  <BootstrapForm.Group className="mb-3 form-group">
                    <BootstrapForm.Label>Email address</BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="email" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3 form-group">
                    <BootstrapForm.Label>Password</BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      isInvalid={touched.password && errors.password}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="password" />
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>

                  <BootstrapForm.Group className="mb-3 form-group">
                    <BootstrapForm.Label className="text-center">Role</BootstrapForm.Label>
                    <Row id="radio">
                      <Col>
                      <BootstrapForm.Check

                        style={{textAlign:"left"}}
                        inline
                        label="Admin"
                        name="role"
                        type="radio"
                        as={Field}
                        value="admin"
                        onChange={handleChange}
                        isInvalid={touched.role && errors.role}
                        />
                        </Col>
                        <Col>
                      <BootstrapForm.Check
                      style={{textAlign:"left"}}
                        inline
                        label="User"
                        name="role"
                        type="radio"
                        as={Field}
                        value="user"
                        onChange={handleChange}
                        isInvalid={touched.role && errors.role}
                        />
                        </Col>
                    </Row>
                    <BootstrapForm.Control.Feedback type="invalid">
                      <ErrorMessage name="role" />
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
                </FormikForm>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
