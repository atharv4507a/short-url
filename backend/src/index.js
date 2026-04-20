const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require("express");
const app = express();
const cors = require('cors');


const { connectMongoDB } = require('./config/mongoDB');
const urlRoutes = require('./routes/urlRoutes');

connectMongoDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/url', urlRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Example app listening locally at: http://localhost:${PORT}`);
});