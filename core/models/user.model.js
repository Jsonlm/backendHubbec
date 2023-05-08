const mongoose = require("../conn/bd");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,/* 
        unique: true,
        required: true, */
    },
    phoneNumber: {
        type: String,
    },
    documentType: {
        type: String,
    },
    documentNumber: {
        type: String,
    },
    birthdate: {
        type: String,
    },
    expeditionDate: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    photoProfile: {
        type: String,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
/* 
"email": "example@example.com",
"phoneNumber": "310000000",
"firstname": "Pepito Armado",
"lastname": "Pérez Pinzon",
“documentType”: “CC”,
"documentNumber": "10533422567",
"birthdate": "01-01-1992",
"expeditionDate": "01-01-2021" 
*/