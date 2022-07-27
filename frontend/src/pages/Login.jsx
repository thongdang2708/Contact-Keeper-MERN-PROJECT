
import React from 'react';
import { useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { resetForLogin } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { loginUser } from '../features/auth/AuthSlice';
import {toast} from "react-toastify";


function Login() {

    let [formData, setFormData] = useState({
        "email": "",
        "password": ""
    });

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let {user, isError, isSuccess, message, isLoading} = useSelector(state => state.auth);

    useEffect(() => {

        if (isError) {
            toast.error(message)
        };

        if (isSuccess || user) {
            navigate("/")
        };

        dispatch(resetForLogin());
    },[isError, message, isSuccess, user, dispatch, navigate]);


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
            email: formData.email,
            password: formData.password
        };

        dispatch(loginUser(inputData));

        setFormData({
            "email": "",
            "password": ""
        });



    }   


    if (isLoading) {
        return (<Spinner />)
    }

  return (
    <div>
        <div className="heading">
            <h1 className="text-center text-3xl font-bold text-sky-500 mt-10"> Account Login! </h1>
        </div>

        <div className='form w-10/12 mx-auto xl:w-5/12 lg:w-6/12 md:w-7/12 my-8'>
            <form onSubmit={handleSubmit}>
                <div className='form-group flex flex-col mb-5'>
                    <label htmlFor="email" className="text-black font-bold mb-2 text-xl"> Email: </label>
                    <input type="email" name="email" id="email" placeholder='Enter your email...' value={formData.email} onChange={handleChange} className="input input-lg bg-gray-500 focus:outline-0 text-white"/>
                </div>

                <div className='form-group flex flex-col mb-5'>
                    <label htmlFor="password" className="text-black font-bold mb-2 text-xl"> Password: </label>
                    <input type="password" name="password" id="password" placeholder='Enter your password...' value={formData.password} onChange={handleChange} className="input input-lg bg-gray-500 focus:outline-0 text-white"/>
                </div>

                <div className='form-group mb-5'>
                    <button type='submit' className='w-full btn btn-lg bg-sky-500 focus:outline-0 hover:bg-gray-500'> Submit </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login

