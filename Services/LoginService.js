import axios from "axios";

export async function login(formData) {
    return axios.post("http://localhost:3700/login",formData);
}