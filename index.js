const express = require('express');
require('dotenv').config();
const mongoose = require('./db');
const routes = require('./Routes/employeeRoutes');


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(routes);

app.listen(port, () => {
    console.log(`Server is runing at port ${port}`)
})
