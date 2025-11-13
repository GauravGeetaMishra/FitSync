import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/,"Password must be between 8 tp 12 characters, atleast one upper case, one lower case, one numeric, and no symbols allowed"),
    age: Yup.string().required("age is required"),
    gender: Yup.string().required("gender is required"),
    height_cm: Yup.string().required("height is required"),
    weight_kg: Yup.string().required("weight is required")
});