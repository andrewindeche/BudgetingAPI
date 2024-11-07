const express = require("express");
const Envelope = require('../models/Envelope'); 
const Salary = require('../models/Salary');
const salariesRouter = express.Router();


salariesRouter.post('/',async (req, res) => {

    console.log(req.body);
    const { name, budget } = req.body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).send("Invalid data: 'name' is required.");
    }

    if (isNaN(budget) || budget <= 0) {
        return res.status(400).send("Invalid data: 'budget' must be a valid number greater than zero.");
    }

    try {
        const newEnvelope = new Envelope({
            name,
            budget
        });

        await newEnvelope.save();

        return res.status(201).json(newEnvelope);
    } catch (error) {
        return res.status(500).send("Error creating envelope: " + error.message);
    }
});

salariesRouter.post('/set-salary', async (req, res) => {
    const { monthlySalary } = req.body;

    if (!monthlySalary || isNaN(monthlySalary) || monthlySalary <= 0) {
        return res.status(400).send("Invalid monthly salary.");
    }

    try {
        const existingSalary = await Salary.findOne();
        if (existingSalary) {
            return res.status(400).send("Monthly salary is already set.");
        }

        const newSalary = new Salary({
            monthlySalary,
            remainingSalary: monthlySalary
        });

        await newSalary.save();
        return res.status(201).json(newSalary);
    } catch (error) {
        return res.status(500).send("Error setting monthly salary: " + error.message);
    }
});

salariesRouter.get('/', async (req, res) => {
    try {
        const envelopes = await Envelope.find();
        if (envelopes.length === 0) {
            return res.status(404).send("No envelopes found");
        }
        return res.status(200).json(envelopes);
    } catch (error) {
        return res.status(500).send("Error retrieving envelopes: " + error.message);
    }
});

salariesRouter.get('/:id', async (req,res) => {
    const {id} = req.params;

    try {
        const envelope = await Envelope.findById(id); 
        if (!envelope) {
            return res.status(404).send("Envelope not found");
        }
        return res.status(200).json(envelope);
    } catch (error) {
        return res.status(500).send("Error retrieving envelope: " + error.message);
    }
});

module.exports = salariesRouter;
