import axios from "axios";
const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const getUserDetails = async() =>{
// const getAPI = await fetch(`${BASE_URL}/users`);
// const getData = getAPI.json();
const getData = await axios.get(`${BASE_URL}/users`);
return getData;
}

export const addUserDetails = async(payload) =>{
    // const getAPI = await fetch(`${BASE_URL}/users` ,{
    //     method:'POST',
    //     body:JSON.stringify(payload),
    // });
    // const getData = getAPI.json();

    const getData = await axios.post(`${BASE_URL}/users`,payload);
    return getData;
}
export const updateUserDetails = async(userID,payload) =>{
    // const getAPI = await fetch(`${BASE_URL}/users/${usesID}` ,{
    //     method:'PUT',
    //     body:JSON.stringify(payload),
    // });
    // const getData = getAPI.json();
    const getData = await axios.delete(`${BASE_URL}/users/${userID}`,payload);
    return getData;
}

export const deteleUserDetails = async(userID) =>{
    // const getAPI = await fetch(`${BASE_URL}/users/${userID}` ,{
    //     method:'DELETE'
    // });
    // const getData = getAPI.json();
    const getData = await axios.delete(`${BASE_URL}/users/${userID}`);
    return getData;
}

