import * as Yup from "yup";

export const feedbackSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/,"Password must be between 8 tp 12 characters, atleast one upper case, one lower case, one numeric, and no symbols allowed"),
    feedback: Yup.string().min(10, "at least 10 characters").required("Feedback is required"),
});