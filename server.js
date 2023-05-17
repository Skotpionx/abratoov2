require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// MongoDB
const connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Conectado a la base de datos");
    }catch (error) {
        throw error;
    }
};
//Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const usersRoute = require("./backend/routes/users");

app.use("/auth", usersRoute);

app.listen(port, () => {
    connect();
    console.log(`Server is running on port ${port}`);
});
