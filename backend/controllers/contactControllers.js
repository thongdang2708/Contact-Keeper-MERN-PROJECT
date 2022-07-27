
let User = require("../models/userModel");
let Contact = require("../models/contactModel");
let asyncHandler = require("express-async-handler");
//@desc          Add Contact
//@route         POST  /api/contacts/
//@access        Private


exports.createContact = asyncHandler(async (req, res, next) => {
    
       let {name, email, phone, title} = req.body;

       if (!name || !email || !phone || !title) {
           res.status(400)
           throw new Error("Please fill all information!")
       };

       let user = await User.findById(req.user._id);

       if (!user) {
           res.status(401)
           throw new Error("User not found!")
       };

       let emailExists = await Contact.findOne({email: email});

       if (emailExists) {
           res.status(400)
           throw new Error("Email exists already!")
       };

       let contact = await Contact.create({
           user: req.user._id,
           name,
           email,
           phone,
           title
       });

       res.status(201).json(contact);
        
});


//@desc              Get All Contacts
//@route             GET    /api/contacts/
//@access            Private

exports.getAllContacts = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user._id); 

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let contacts = await Contact.find({user: req.user._id});

    res.status(200).json(contacts);
});



//@desc          Get Single Contact
//@route        GET     /api/contacts/:id
//@desc         Private

exports.getSingleContact = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404)
        throw new Error("Contact not found!")
    };

    if (contact.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized!")
    };

    res.status(200).json(contact);
});

//@desc          Update Contact
//@route         PUT   /api/contacts/:id
//@desc          Private

exports.updateContact = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404)
        throw new Error("Contact not found!")
    };

    if (contact.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized!")
    };

    let updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(updateContact);

});

//@desc            Delete Contact
//@route           DELETE /api/contacts/:id
//@desc            Private

exports.deleteContact = asyncHandler(async (req, res, next) => {

    let user = await User.findById(req.user.id);

    if (!user) {
        res.status(401)
        throw new Error("User not found!")
    };

    let contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404)
        throw new Error("Contact not found!")
    };

    if (contact.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error("Not Authorized!")
    };

    let deleteContact = await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json(deleteContact);
});