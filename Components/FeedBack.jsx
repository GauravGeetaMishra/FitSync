import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { Button, Container, Form as BootstrapForm } from "react-bootstrap";
import { feedbackSchema } from "../schemas/FeedBackSchema";
import "../Styles/Styles/LoginForm.css";
import "../Styles/Styles/RegisterUser.css";
import { Bounce, toast } from "react-toastify";
import { setFeedback } from "../Services/FeedbackService";

export function FeedBack() {
  const handleSubmit = async (values) => {
    try {
      const response = await setFeedback(values);
      if (response.status === 200) {
        // show success message
        toast.success("Feedback Submitted", {
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
    <Container style={{height:"100vh"}}>
      <Formik
        initialValues={{ email: "", password: "", feedback:"" }}
        validationSchema={feedbackSchema}
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
              <BootstrapForm.Label>Feedback</BootstrapForm.Label>
              <BootstrapForm.Control
                as={Field}
                component="textarea"
                placeholder="Enter feedback"
                name="feedback"
                onChange={handleChange}
                value={values.feedback}
                isInvalid={touched.feedback && errors.feedback}
              />
              <BootstrapForm.Control.Feedback type="invalid">
                <ErrorMessage name="feedback" />
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
    </Container>
  );
}
