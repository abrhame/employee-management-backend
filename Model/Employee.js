const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required:true,
        unique:true,
    },
    department: {
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true,
    }
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee