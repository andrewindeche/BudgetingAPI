const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./server/db');
const salariesRouter = require('./server/salaries');

const PORT = process.env.PORT || 3000;
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/envelopes',salariesRouter)

app.get('/',(req,res) => {
  res.status(200).send("welcome to MongoDB")
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
  });

module.exports = app;