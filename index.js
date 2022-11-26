const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const jwt = require("jsonwebtoken")
require("dotenv").config()

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Unauthorized Access" })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: "Forbidden access." })
        }
        req.decoded = decoded;
        next();
    })

}

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

//jwt token
app.get('/jwt', async (req, res) => {

    try {
        const email = req.query;
        const token = jwt.sign(email, process.env.SECRET_KEY, { expiresIn: '10h' })
        res.send({
            success: true,
            data: token
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})