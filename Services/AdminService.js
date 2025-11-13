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

export function showAdminEmail(email){
    return axios.get(`http://localhost:3700/admin/${email}`,getAuthHeader());
}

export function showAdminById(id){
    return axios.get(`http://localhost:3700/admin-id/${id}`,getAuthHeader());
}

export function registerAdmin(formData){
    return axios.post("http://localhost:3700/admin",formData, getAuthHeader());
}

export function showAllAdmin(){
    return axios.get("http://localhost:3700/admin", getAuthHeader());
}

export function deleteAdmin(id){
    return axios.delete(`http://localhost:3700/admin/${id}`, getAuthHeader());
}

export function updateAdmin(id, formData){
    return axios.put(`http://localhost:3700/admin/${id}`, formData, getAuthHeader());
}