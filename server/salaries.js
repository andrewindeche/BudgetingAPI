const express = require("express");
const salariesRouter = express.Router;

let monthlySalary = 150000;
let envelopes = [];
let totalBudget = 0;

salariesRouter.get('/api/envelopes',(req,res) => {
    const {name,budget} = req.body;
    const proposedBudget = totalBudget + budget;
    switch(true){
        case proposedBudget > monthlySalary:
            return res.status(400).send("your budget has exceeded your salary");
        case !name || !budget || !NaN(budget):
            return res.status(400).send("Invalid data");
        default: 
            const newEnvelopes = { id: envelopes.length + 1, name, budget};
            envelopes.push(newEnvelopes);
            totalBudget = proposedBudget;
            return res.status(201).send
    };
});