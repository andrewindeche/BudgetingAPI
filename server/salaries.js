const express = require("express");
const salariesRouter = express.Router();

let monthlySalary = 150000;
let envelopes = [];
let totalBudget = 0;

salariesRouter.post('/',(req,res) => {
    const {name,budget} = req.body;
    const proposedBudget = totalBudget + budget;
    switch(true){
        case proposedBudget > monthlySalary:
            return res.status(400).send("your budget has exceeded your salary");
        case !name || !budget:
            return res.status(400).send("Invalid data");
        default: 
            const newEnvelope = { id: envelopes.length + 1, name, budget};
            envelopes.push(newEnvelope);
            totalBudget = proposedBudget;
            return res.status(201).send(newEnvelope);
    };
});

salariesRouter.get('/', (req, res) => {
    const balance = monthlySalary - totalBudget;
    res.status(200).json({
        balance: balance,
        envelopes: envelopes
    });
});


module.exports = salariesRouter;