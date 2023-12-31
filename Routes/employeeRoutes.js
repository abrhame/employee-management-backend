const express = require('express');
const employeeController = require('../controller/employeeController');
const authController = require("../controller/authController");

const router = express.Router();

// register user 
router.post("/register", authController.register);  

// login user
router.post("/login", authController.login);

// validate token
router.get('/validate', authController.validateToken)

// fetch paginated Employees data
router.get("/employees",employeeController.getAllEmployees);

// fetech individual Employee data
router.get("/employees/:id",employeeController.getEmployeeById);

// create Employee
router.post("/employees", employeeController.createEmployee);

// update indvidual Employee data
router.put("/employees/:id",(req,res,next) => {
    console.log(req.params,req.body)
    next();
}, employeeController.upateEmployeeById);

// delete Employee 
router.delete("/employees/:id", employeeController.deleteEmployeeById);



module.exports = router;



