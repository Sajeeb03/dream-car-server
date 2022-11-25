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

//collections

const Users = client.db('Dream-car').collection("users");
const Categories = client.db('Dream-car').collection("categories");

app.put('/users', async (req, res) => {
    try {
        const { email } = req.query;
        const user = req.body;
        filter = { email: email }
        updateUser = {
            $set: user
        }
        const result = await Users.updateOne(filter, updateUser, { upsert: true })
        res.send({
            success: true,
            message: "user added"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


// app.post("/categories", async (req, res) => {
//     try {
//         const result = await Categories.insertMany(req.body)
//         res.send(result)
//     } catch (error) {

//     }
// })

//categories get api 

app.get("/categories", async (req, res) => {
    try {
        const result = await Categories.find({}).toArray();
        res.send({
            success: true,
            data: result
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})