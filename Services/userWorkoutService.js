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

export function setUserWorkout(user_id, workout_id, data){
    return axios.post(`http://localhost:3700/user-workout/${user_id}/${workout_id}`, data, getAuthHeader());
}



export function getUserWorkout(user_id){
    return axios.get(`http://localhost:3700/user-workout/${user_id}`,getAuthHeader());
}

