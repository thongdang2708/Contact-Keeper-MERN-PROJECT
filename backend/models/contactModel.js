
const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        enum: ["Personal", "Professional"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Contact", ContactSchema);







