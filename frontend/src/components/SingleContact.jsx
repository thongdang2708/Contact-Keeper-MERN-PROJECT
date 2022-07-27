
import React from 'react';
import PropTypes from 'prop-types';
import {AiFillMail} from "react-icons/ai";
import {AiFillPhone} from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { deleteForContact } from '../features/contact/ContactSlice';
 
function SingleContact({contact, openModal, closeModal, getId}) {

    //Set Dispatch
    let dispatch = useDispatch();
    const editClick = (id) => {

        openModal();
        getId(id);
    };
    
    //Function to delete contact
    const deleteContact = (id) => {
        dispatch(deleteForContact(id));
    };

  return (
    <div className='bg-slate-100 p-5 border-2 rounded-lg shadow-lg'>
        <div className='flex items-center justify-between'>
           <h4 className='text-md text-sky-500 font-bold'> {contact.name} </h4>
           <div className={`status status-${contact.title}`}> {contact.title} </div>

        </div>

        <div className='flex items-center mb-3'>
            <div className='mr-2'>
                <AiFillMail />
            </div>

            <p> {contact.email} </p>
        </div>
    
        <div className='flex items-center mb-3'>
            <div className='mr-2'>
                <AiFillPhone />
            </div>

            <p> {contact.phone} </p>
        </div>

        <div>
            <div className='btn btn-sm bg-sky-500 focus:outline-0 mr-2' onClick={() => editClick(contact._id)}> Edit </div>
            <div className='btn btn-sm bg-pink-500 focus:outline-0' onClick={() => deleteContact(contact._id)}> Delete </div>
        </div>

        
  

        
    </div>
  )
};

SingleContact.propTypes = {
    contact: PropTypes.object.isRequired
};


export default SingleContact