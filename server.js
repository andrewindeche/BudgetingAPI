const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./server/db');
const salariesRouter = require('./server/salaries');

let envelopes = [];
let totalBudget = 0;

const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/envelopes',salariesRouter)



app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
  });

app.get('/',(req,res) => {
    res.send("Hello World. Welcome to Express envelope budgeting system");
    res.status(200).send(`Your budgets are:${ envelopes, totalBudget }`);
});

module.exports = app;