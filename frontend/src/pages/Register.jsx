
import React from 'react';
import { useState } from 'react';
import {toast} from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { resetForAll } from '../features/auth/AuthSlice';
import Spinner from '../components/Spinner';
import { useEffect } from 'react';
import { registerUser } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';




function Register() {

    //Global state for user
    let {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth);


    //Set dispatch and navigate
    let dispatch = useDispatch();

    let navigate = useNavigate();

    //Set effect for direct route for register form

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(resetForAll());
    }, [isSuccess, isError, message, navigate, dispatch, user]);

    //Set state for data in form

    let [formData, setFormData] = useState({
        "name": "",
        "email": "",
        "password": "",
        "password2": ""
    });

    //Set changes for data in form

    const handleChange = (e) => {
        
        let {name, value} = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    //Submit to register

    const handleSubmit = (et) => {
        et.preventDefault();

        if (formData.password !== formData.password2) {
            toast.error("Password does not match!")
        }
        
        let inputData = {
            name: formData.name,
            email: formData.email,
            password: formData.password
        };

        dispatch(registerUser(inputData));
        
        setFormData({
            "name": "",
            "email": "",
            "password": "",
            "password2": ""
        });
    }

    if (isLoading) {
        return (<Spinner />)
    }

  return (
    <div>
        <div className="heading">
            <h1 className='text-center text-sky-500 text-2xl font-bold mt-10'> Account Register </h1>
        </div>

        <div className='form w-10/12 xl:w-5/12 lg:w-6/12 md:w-7/12 mx-auto my-10'>
            <form onSubmit={handleSubmit}>
                <div className='form-group flex flex-col mb-5'>
                   <label htmlFor="name" className="text-black text-2xl text-black font-bold"> Name: </label>
                   <input type="text" name="name" id="name" placeholder='Enter your name...!' value={formData.name} onChange={handleChange} className='text-white input input-md focus:outline-0 bg-gray-500'/>
                </div>

                <div className='form-group flex flex-col mb-5'>
                   <label htmlFor="email" className="text-black text-2xl text-black font-bold"> Email: </label>
                   <input type="email" name="email" id="email" placeholder='Enter your email...!' value={formData.email} onChange={handleChange} className='text-white input input-md focus:outline-0 bg-gray-500'/>
                </div>

                <div className='form-group flex flex-col mb-5'>
                   <label htmlFor="password" className="text-black text-2xl text-black font-bold"> Password: </label>
                   <input type="password" name="password" id="password" placeholder='Enter your password...!' value={formData.password} onChange={handleChange} className='text-white input input-md focus:outline-0 bg-gray-500'/>
                </div>

                <div className='form-group flex flex-col mb-5'>
                   <label htmlFor="password2" className="text-black text-2xl text-black font-bold"> Confirmed Password: </label>
                   <input type="password" name="password2" id="password2" placeholder='Confirm your password...!' value={formData.password2} onChange={handleChange} className='text-white input input-md focus:outline-0 bg-gray-500'/>
                </div>

                <div className='form-group flex flex-col mb-5'>
                    <button type="submit" className='w-full btn btn-lg bg-sky-500 focus:outline-0 hover:bg-gray-500'> Submit </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register