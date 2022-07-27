
import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


//Set private function to direct route with user authentication
const Private = () => {

    let [loggedIn, setLoggedIn] = useState(false);
    let [checkStatus, setCheckStatus] = useState(true);
    let {user} = useSelector(state => state.auth);

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false);
        }
        setCheckStatus(false)
    },[user])

   if (checkStatus) {
       return (<Spinner/>)
   }

   return loggedIn ? <Outlet /> : <Navigate to="/login"/>
}

export default Private