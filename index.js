const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const jwt = require("jsonwebtoken")
require("dotenv").config()

const port = process.env.PORT || 5000;
const app = express();

//middle wares
app.use(cors());
app.use(express.json());

const verifyToken = require('./Middlewares/verifyJWT')
const verifyJWT = verifyToken(jwt);


const isAdmin = require('./Middlewares/verifyAdmin');
const isSeller = require('./Middlewares/verifySeller')


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


//collections
const Users = client.db('Dream-car').collection("users");
const Categories = client.db('Dream-car').collection("categories");
const Products = client.db('Dream-car').collection("products");
//checking middle ware
const verifyAdmin = isAdmin(Users);
const verifySeller = isSeller(Users);




//api
const categoryApi = require('./Api/categories')
const checkAdmin = require('./Api/admin')
const checkSeller = require('./Api/seller')
const generateToken = require("./Api/jwtToken")
const postUser = require("./Api/postUser")
const postProducts = require("./Api/postProducts")



//categories get api
categoryApi(app, Categories, verifyJWT)

//post user while login
postUser(app, Users)

//check admin
checkAdmin(app, Users)


//check seller route
checkSeller(app, Users)

//post product i mean car

postProducts(app, Products, verifyJWT, verifySeller);


//jwt token
generateToken(app, jwt);

app.get("/", (req, res) => {
    res.send("server is running")
})

//listen api
app.listen(port, () => {
    console.log("server is on")
})