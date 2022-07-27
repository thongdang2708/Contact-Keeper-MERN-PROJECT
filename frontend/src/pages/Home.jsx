
import React, { useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {toast} from "react-toastify";
import { resetFunction } from '../features/contact/ContactSlice';
import { addContact } from '../features/contact/ContactSlice';



function Home() {

    let [formData, setFormData] = useState({
        "name": "",
        "email": "",
        "phone": "",
        "title": "Personal"
    });
    let navigate = useNavigate();
    let {isError, isSuccess, isLoading, message} = useSelector(state => state.contact);
    let {user} = useSelector(state => state.auth);
    let dispatch = useDispatch();


    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            navigate("/contacts");
        }

        dispatch(resetFunction());
    },[isError, message, isSuccess, navigate, dispatch]);
    



    const handleChange = (e) => {
        let {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleSubmit = (et) => {
        et.preventDefault();


        let inputData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            title: formData.title
        };

        if (user) {
            dispatch(addContact(inputData));
        } else {
            navigate("/login");
        }
      

        setFormData({
            "name": "",
            "email": "",
            "phone": "",
            "title": "Personal"
        });
    }

  return (
    <div>
        <div className='heading'>
            <h1 className='text-center text-3xl font-bold text-sky-500 my-10'> Add Contact </h1>
        </div>

        <div className='form w-10/12 xl:w-7/12 lg:w-8/12 md:w-9/12 mx-auto'>
            <form onSubmit={handleSubmit}>
                <div className='form-group mb-5'>
                    <input type="text" name="name" id="name" placeholder='Name' value={formData.name} onChange={handleChange} className="input input-lg bg-gray-500 w-full focus:outline-0"/>
                </div>

                <div className='form-group mb-5'>
                    <input type="email" name="email" id="email" placeholder='Email' value={formData.email} onChange={handleChange} className="input input-lg bg-gray-500 w-full focus:outline-0"/>
                </div>

                <div className='form-group mb-5'>
                    <input type="text" name="phone" id="phone" placeholder='Phone' value={formData.phone} onChange={handleChange} className="input input-lg bg-gray-500 w-full focus:outline-0"/>
                </div>

                <div className='form-group mb-5'>
                    <h3 className="text-black font-bold text-2xl mb-3"> Contact Type </h3>
                    
                   <input type="radio" name="title" id="personal" value="Personal" onChange={handleChange} checked={formData.title === "Personal"} className="cursor-pointer"/> 
                   <label htmlFor="personal" className='mr-5'> Personal </label>


                   <input type="radio" name="title" id="professional" value="Professional" onChange={handleChange} checked={formData.title === "Professional"} className="cursor-pointer"/>
                   <label htmlFor="professional"> Professional </label>
                </div>

                <div className='form-group mb-5'>
                    <button type="submit" className='btn btn-lg w-full bg-sky-500 hover:bg-pink-500 focus:outline-0'> Add Contact </button>
                </div>


            </form>
        </div>
    </div>
  )
}

export default Home