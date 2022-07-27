

import axios from "axios";

const API_URL = "/api/contacts/";


//Create contact

const createContact = async (inputData, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.post(API_URL, inputData, config);

    return response.data;
};

//Display contacts

const getAllContacts = async (token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.get(API_URL, config);

    return response.data;
};

//Display single contact

const getSingleContact = async (id, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.get(API_URL + id, config);

    return response.data;
};

//Update contact

const updateContact = async (text, id, token) => {
    
    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    let response = await axios.put(API_URL + id, text, config);

    return response.data;
};


//Delete contact

const deleteContact = async (id, token) => {

    let config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    let response = await axios.delete(API_URL + id, config);

    return response.data;
}

const ContactService = {
    createContact,
    getAllContacts,
    getSingleContact,
    updateContact,
    deleteContact,
};

export default ContactService;