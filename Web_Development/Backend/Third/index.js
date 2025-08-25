const express = require("express");
const fs = require('fs');
const mongoose = require("mongoose");

// const 

const app = express();
const PORT = 8000;

mongoose
    .connect('mongodb://127.0.0.1:27017/ranvijay-app1')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log('Mongo Error', err));


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
});

const user = mongoose.model("user", userSchema);






// Middleware
app.use(express.urlencoded({ extended: false }));








app.listen(PORT, () => console.log(`Server Started at ${PORT}`));