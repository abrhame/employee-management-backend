const express = require('express');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
    res.send("Hello world")
})

app.listen(port, () => {
    console.log(`Server is runing at port ${port}`)
})
