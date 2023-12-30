const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')


const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.DB_CONNECTION_STRING;

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true});

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Cnnected to Database");
})

db.on("error", (error) => {
    console.log("error: ", error );
})

db.on("disconnected", () => {
    console.log("Disconnected from Databaase");
})

db.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Mongodb connection closed through app termination");
        process.exit(0);
    });
});




app.get('/',(req,res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log(`Server is runing at port ${port}`)
})
