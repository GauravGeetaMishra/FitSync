import axios from "axios";
import { getToken } from './TokenService';

export function getAuthHeader(){
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export async function setFeedback(formData) {
    return axios.post(`http://localhost:3700/feedback`,formData,getAuthHeader());
}

export async function showFeedbacks() {
    return axios.get(`http://localhost:3700/feedback`, getAuthHeader());
}