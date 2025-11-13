import axios from 'axios';
import { getToken } from './TokenService';

export function getAuthHeader(){
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export function getAllUsers(){
    return axios.get("http://localhost:3700/user",getAuthHeader());
}

export async function registerUser(formData) {
    return axios.post("http://localhost:3700/user",formData, getAuthHeader());
}

export function deleteUser(id){
    return axios.delete(`http://localhost:3700/user/${id}`,getAuthHeader());
}

export function getUser(id){
    return axios.get(`http://localhost:3700/user/${id}`,getAuthHeader());
}

export function updateUser(id, formData){
    return axios.put(`http://localhost:3700/user/${id}`, formData,getAuthHeader());
}

export function BuyNow(){
    return axios.get("http://localhost:5000/api",getAuthHeader());
}