const mongoose = require("mongoose");

const uri = process.env.DB_CONNECTION_STRING 

mongoose.connect(uri);

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

module.exports = mongoose;