

import axios from "axios";

const API_URL = "/api/users/";


//Function to register
const register = async (inputData) => {

    let response = await axios.post(API_URL, inputData);

    return response.data;
};

//Function to log in
const login = async (inputData) => {

    let response = await axios.post(API_URL + "login", inputData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    };

    return response.data;
};

//Function to log out
const logOut = () => localStorage.removeItem("user");

const AuthService = {
    register,
    login,
    logOut
};

export default AuthService;