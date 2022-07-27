
import React from 'react';
import { Link } from 'react-router-dom';
import {FaHouseUser} from "react-icons/fa";
import { useSelector } from 'react-redux';
import { resetForAll } from '../features/auth/AuthSlice';
import { logoutUser } from '../features/auth/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function Header() {

    //Global state of user
    let {user} = useSelector(state => state.auth);

    //Set dispatch and navigate
    let navigate = useNavigate();

    let dispatch = useDispatch();


    //Function for log out button
    const handleClick = () => {

        dispatch(logoutUser());
        dispatch(resetForAll());
        navigate("/");
    }
  return (
    <div className="bg-sky-500 p-5">
        <div className="w-12/12 mx-auto xl:w-9/12 lg:w-9/12 md:w-10/12">
            <div className="flex items-center justify-between">
                <div>
                    <Link to="/">
                    <h1 className="flex items-center"> <FaHouseUser size={50} color={"white"}/> <span className='mt-2 ml-4 text-2xl text-white font-bold'> Contact Keeper </span> </h1>
                    </Link>
                </div>

                {/* If there is a user, there is a priviledge to show personal information and log out */}
                {user ? (

            <div className="flex items-center p-2 justify-between">
            
            
                        
            <div className='mr-5 mt-2'>
            <div className="p-1 xl:p-3 lg:p-3 md:p-2 bg-amber-400 rounded-lg shadow-lg focus:outline-0 hover:bg-gray-500 text-white font-bold text-center text-md xl:text-lg lg:text-lg md:text-xl cursor-pointer"> Hello {user.name} </div>
            </div>
            
          
            <div className='mt-2'>
            <Link to={"/contacts"}>
            <div className="p-1 xl:p-3 lg:p-3 md:p-2 rounded-lg shadow-lg bg-amber-400 focus:outline-0 hover:bg-gray-500 text-white text-center font-bold text-md xl:text-lg lg:text-lg md:text-xl cursor-pointer" > All Contacts </div>
            </Link>
            </div>
          

            <div className='ml-5 mt-2'>
            <div className="p-1 xl:p-3 lg:p-3 md:p-2 rounded-lg shadow-lg bg-amber-400 focus:outline-0 hover:bg-gray-500 text-white text-center font-bold text-md xl:text-lg lg:text-lg md:text-xl cursor-pointer" onClick={handleClick}> Log Out </div>
            </div>

            </div>
                ) : (
                           <div className="flex items-center p-2 justify-between">

                       <div className="mr-10 mt-2">
                         <Link to="/register">
                           <div className="p-1 xl:p-3 lg:p-3 md:p-2 bg-amber-400 rounded-lg shadow-lg focus:outline-0 text-white font-bold hover:bg-gray-500 text-md xl:text-lg lg:text-lg md:text-xl cursor-pointer"> Register </div>
                         </Link>   
                         </div>
   
   
                       <div className="ml-5 mt-2">
                           <Link to="/login">
                               <div className="p-1 xl:p-3 lg:p-3 md:p-2 rounded-lg shadow-lg bg-amber-400 focus:outline-0 hover:bg-gray-500 text-white font-bold text-md xl:text-lg lg:text-lg md:text-xl cursor-pointer"> Log In </div>
                           </Link>
                       </div>
                   </div>
                )}
             
            </div>
        </div>
    </div>
  )
}

export default Header