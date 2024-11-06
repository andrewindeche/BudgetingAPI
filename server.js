const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const salariesRouter = require('./server/api');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/envelopes',salariesRouter)



app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
  });

app.get('/',(req,res) => {
    res.send("Hello World. Welcome to Express envelope budgeting system");
    res.status(200).send({ envelopes, totalBudget });
});

module.exports = app;