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

export function showAllWorkouts(){
    return axios.get("http://localhost:3700/workout", getAuthHeader());
}

export function getWorkout(workout_id){
    return axios.get(`http://localhost:3700/workout/${workout_id}`, getAuthHeader());
}

export function deleteWorkout(workout_id){
    return axios.delete(`http://localhost:3700/workout/${workout_id}`, getAuthHeader());
}

export function setWorkout(workout_id, data){
    return axios.get(`http://localhost:3700/workout/${workout_id}`, data, getAuthHeader());
}
