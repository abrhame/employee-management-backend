const Employee = require("../Model/Employee");

const employeeController = {
    getAllEmployees: async (req,res) => {
        const { page = 1, limit = 5} = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);

        const skip = (pageNumber - 1) * limitNumber
        try {
            const totalEmployees = await Employee.countDocuments();
            const employees = await Employee.find().skip(skip).limit(limitNumber)
            res.status(200).json({employees,totalEmployees})
        } catch(error) {
          res.status(500).json(`Internal Server Error: ${error}`);  
        }
    },

    getEmployeeById: async (req,res) => {
        const employeeId = req.params.id;
        try {
            const employee = await Employee.findById(employeeId);
            if (! employee) {
                return res.status(404).json("Employee not found")
            }
            res.json(employee);
        } catch(error){
            res.status(500).json(`Internal Server Error: ${error}`); 
        }
    },

    upateEmployeeById: async (req,res) => {
        const employeeId = req.params.id;
        const updateData = req.body;
        console.log(employeeId,updateData)
        try{
            const updateEmployee = await Employee.findByIdAndUpdate(employeeId,updateData, {new:true})
            if (!updateEmployee){
                return res.status(404).json('Employee not found')
            }
            res.json(updateEmployee)
        } catch(error) {
            res.status(500).json(`Internal Server Error: ${error}`); 
        }
    },

    createEmployee: async (req,res) => {
        const employeeData = req.body;
        try {
            const newEmployee = new Employee(employeeData);
            await newEmployee.save();
            res.status(201).json(newEmployee);
        }catch(error) {
            res.status(500).json(`Internal Server Error: ${error}`); 
        }
    },

    deleteEmployeeById: async (req,res) => {
        const employeeId = req.params.id;
        try{
            const deletedUser = await Employee.findByIdAndDelete(employeeId);
            if (!deletedUser) {
                return res.status(404).json("Employee not Found");
            }
            res.json("Employee deleted Sucessfully");
        }catch(error) {
            res.status(500).json(`Internal Server Error: ${error}`); 
        }
    }
}


module.exports = employeeController;