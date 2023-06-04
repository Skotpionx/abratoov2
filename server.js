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
//DESARROLLO
// app.use(cors({ credentials: true, origin: true }));
//PRODUCCION
const corsOptions = {
    origin: 'https://abratoov2-6h58-a2jqx8fyc-skotpionx.vercel.app',
    credentials: true, // Esto permite que las cookies se envíen con las solicitudes de CORS.
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const usersRoute = require("./backend/routes/users.js");
const adminRoute = require("./backend/routes/admin.js");
const authRoute = require("./backend/routes/auth.js");
const postRoute = require("./backend/routes/posts.js")


app.use("/admin", adminRoute);
app.use("/users", usersRoute);
app.use("/auth", authRoute);
app.use("/posts", postRoute);

app.listen(port, (req,res) => {
    connect();
    console.log(`Server is running on port ${port}`);
});
