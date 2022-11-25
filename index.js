const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require("dotenv").config()

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.URI;
const client = new MongoClient(uri);

const dbConnect = async () => {
    try {
        await client.connect();
        console.log("db connected")
    } catch (error) {
        console.log(error.message)
    }
}

dbConnect();
// console.log(uri)
app.get("/", (req, res) => {
    res.send("server is running")
})
app.listen(port, () => {
    console.log("server is on")
})