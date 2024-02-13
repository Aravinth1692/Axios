import axios from "axios";
const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getUserDetails = async() =>{
    const getData = await axios.get(`${BASE_URL}/users`);
    return getData;
}

export const addUserDetails = async(payload) =>{
    const getData = await axios.post(`${BASE_URL}/users`,payload);
    return getData;
}
export const updateUserDetails = async(userID,payload) =>{
    const getData = await axios.put(`${BASE_URL}/posts/${userID}`,payload);
    return getData;
}

export const deteleUserDetails = async(userID) =>{
    const getData = await axios.delete(`${BASE_URL}/users/${userID}`);
    return getData;
}

