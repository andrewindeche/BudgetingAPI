const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    monthlySalary: { type: Number, required: true },
    remainingSalary: { type: Number, required: true },
});

const Salary = mongoose.model('Salary', salarySchema);

module.exports = Salary;
