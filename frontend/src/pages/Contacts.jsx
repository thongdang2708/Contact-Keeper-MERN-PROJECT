

import React from 'react';
import { useState } from 'react';
import { resetFunction } from '../features/contact/ContactSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { displayContacts } from '../features/contact/ContactSlice';
import { useEffect } from 'react';
import {toast} from "react-toastify"
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import SingleContact from '../components/SingleContact';
import Modal from "react-modal";
import {FaTimes} from "react-icons/fa";
import { displayContact } from '../features/contact/ContactSlice';
import { resetSingle } from '../features/contact/ContactSlice';
import { getEditItem } from '../features/contact/ContactSlice';
import { updateForContact } from '../features/contact/ContactSlice';
const customStyles = {
    content: {
        position: "relative",
        width: "600px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    }
};

Modal.setAppElement("#root");

function Contacts() {

    let [text, setText] = useState("");
    let {contacts, contact, itemEdit, isError, isLoading, isSuccess, message} = useSelector(state => state.contact);
    let dispatch = useDispatch();
    let [modalOpen, setModalOpen] = useState(false);
    let [contactId, setContactId] = useState("");
    let [editData, setEditData] = useState({
        nameEdit: "",
        emailEdit: "",
        phoneEdit: "",
        titleEdit: "",
    });
    
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setModalOpen(false);
    };
    const handleChange = (e) => {
        e.preventDefault();

        setText(e.target.value.trim().toLowerCase());
    }

    const updateId = (id) => {
        setContactId(id);
        dispatch(getEditItem(id));
    };

    const handleChangeModal = (et) => {
        let {name, value} = et.target;

        setEditData((prevState) => ({
            ...prevState,
            [name]: value
        }))

    };

    const handleSubmit = (ey) => {
        ey.preventDefault();

        let text = {
            name: editData.nameEdit,
            email: editData.emailEdit,
            phone: editData.emailEdit,
            title: editData.titleEdit
        }

        dispatch(updateForContact({
            text: text,
            id: contactId,
        }));
        closeModal();
    }

    useEffect(() => {
        if (itemEdit.edit === true) {
            setEditData({
                nameEdit: itemEdit.item.name,
                emailEdit: itemEdit.item.email,
                phoneEdit: itemEdit.item.phone,
                titleEdit: itemEdit.item.title
            })
        }
    },[itemEdit])
   
    

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(resetFunction());
            }
        }
    },[isSuccess, dispatch]);

    useEffect(() => {

        if (isError) {
            toast.error(message);
        }
        dispatch(displayContacts());

    },[])

    let filterContacts = contacts.filter((contact) => {
        if (text === "") {
            return contact
        } else if (contact.name.toLowerCase().indexOf(text) > -1) {
            return contact
        }
    });

    console.log (filterContacts);

    if (isLoading) {
        return (<Spinner />)
    }


  return (
    <div>
        <div className='heading'>
          
            <h1 className='text-center font-bold text-sky-500 text-3xl my-10'> All Contacts </h1>
        </div>

        <div className='w-10/12 xl:w-9/12 lg:w-8/12 md:w-9/12 mx-auto mb-10'>
            <Link to={"/"}>
            <div className='btn btn-lg bg-sky-500 focus:outline-0 hover:bg-gray-500 mb-5'> Back </div>
            </Link>
        </div>
        <div className='search-bar w-10/12 xl:w-9/12 lg:w-8/12 md:w-9/12 mx-auto mb-10'>
            <input type="text" name="text" id="text" value={text} onChange={handleChange} className="input input-lg bg-gray-500 w-full focus:outline-0 text-white"/> 
        </div>  

        <Modal isOpen={modalOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Edit Information">
                <div className="text-end">
                    <div className='btn btn-sm bg-pink-500 hover:bg-gray-500 focus:outline-0' onClick={closeModal}> <FaTimes /> </div>
                </div>

                <h1 className='text-center font-bold text-sky-500 text-xl mb-5'> Edit Note </h1>

                <div className='form'>
                    <form onSubmit={handleSubmit}>
                    <div className='form-group mb-5'>
                        <input type="text" name="nameEdit" id="id" onChange={handleChangeModal} className='input input-md bg-gray-500 w-full focus:outline-0' value={editData.nameEdit}/>
                    </div>

                    <div className='form-group mb-5'>
                        <input type="email" name="emailEdit" id="email" onChange={handleChangeModal} className='input input-md bg-gray-500 w-full focus:outline-0' value={editData.emailEdit}/>
                    </div>

                    <div className='form-group mb-5'>
                        <input type="text" name="phoneEdit" id="phone" onChange={handleChangeModal} className='input input-md bg-gray-500 w-full focus:outline-0' value={editData.phoneEdit}/>
                    </div>

                    <div className='form-group mb-5'>
                        <h3 className="font-bold mb-3"> Title Type: </h3>

                        <input type="radio" name="titleEdit" id="personal" value="Personal" onChange={handleChangeModal} checked={editData.titleEdit === "Personal"}/>
                        <label htmlFor="personal"> Personal </label>

                        <input type="radio" name="titleEdit" id="professional" value="Professional" onChange={handleChangeModal} checked={editData.titleEdit === "Professional"}/>
                        <label htmlFor="professional"> Professional </label>
                    </div>

                    <div className='form-group mb-5'>
                        <button type="submit" className='w-full btn btn-lg bg-sky-500 focus:outline-0 hover:bg-gray-500'> Edit Note </button>
                    </div>
                    </form>
                </div>
        </Modal>

        <div className="w-10/12 xl:w-9/12 lg:w-8/12 md:w-9/12 mx-auto mb-10 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8">
            {filterContacts.map((contact) => (
                <SingleContact key={contact._id} contact={contact} openModal={openModal} closeModal={closeModal} getId={updateId}/>
            ))}
        </div>
    </div>
  )
}

export default Contacts