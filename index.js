const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
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
const isSeller = require('./Middlewares/verifySeller');
const isBuyer = require('./Middlewares/verifyBuyer');


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
const Advertise = client.db('Dream-car').collection("advertised-Item");
const Orders = client.db('Dream-car').collection("orders");
const Reports = client.db('Dream-car').collection("reports");


//checking middle ware
const verifyAdmin = isAdmin(Users);
const verifySeller = isSeller(Users);
const verifyBuyer = isBuyer(Users);




//api
const categoryApi = require('./Api/categories')
const checkAdmin = require('./Api/admin')
const checkSeller = require('./Api/seller')
const checkBuyer = require("./Api/buyer")
const generateToken = require("./Api/jwtToken")
const postUser = require("./Api/postUser")
const postProducts = require("./Api/postProducts")
const getMyCars = require("./Api/getMyCars")
const getCars = require("./Api/getCars")
const getUsers = require("./Api/getUsers")
const deleteUser = require("./Api/deleteUser")
const verification = require("./Api/putVerification");
const getSellerDetails = require('./Api/getSellerDetails');
const deleteProduct = require('./Api/deleteProduct');
const postAdvertisement = require('./Api/postAdvertisement');
const putProduct = require('./Api/putProduct');
const getAdvertisement = require('./Api/getAdvertisement');
const postOrder = require('./Api/postOrder');
const getOrders = require('./Api/getOrders');
const postReport = require('./Api/postReport');
const getReports = require('./Api/getReports');
const deleteReport = require('./Api/deleteReport');
//categories get api
categoryApi(app, Categories, verifyJWT)

//post user while login
postUser(app, Users)

//getUsers
getUsers(app, Users, verifyJWT, verifyAdmin);

// delete user
deleteUser(app, Users, verifyJWT, verifyAdmin, ObjectId)

//check admin
checkAdmin(app, Users)


//check seller route
checkSeller(app, Users)

//verify seller
verification(app, Users, Products, verifyJWT, verifyAdmin, ObjectId)
//check buyer
checkBuyer(app, Users)

//post product i mean car

postProducts(app, Products, verifyJWT, verifySeller);

//delete product
deleteProduct(app, Products, Advertise, verifyJWT, verifySeller, ObjectId)

//getMyProducts
getMyCars(app, Products, verifyJWT, verifySeller);

//get car with category name
getCars(app, Products, verifyJWT);

//jwt token
generateToken(app, jwt);


//getSellerDetails
getSellerDetails(app, verifyJWT, verifySeller, Users)

//advertise item 
postAdvertisement(app, Advertise, Products, verifyJWT, verifySeller, ObjectId)

//get advertisement
getAdvertisement(app, Advertise);

//update product and remove advertisement
putProduct(app, Products, Advertise, verifyJWT, verifySeller, ObjectId)


//post order
postOrder(app, Orders, verifyJWT, verifyBuyer);

//getOrder
getOrders(app, Orders, verifyJWT, verifyBuyer);


//post report
postReport(app, Reports, verifyJWT);

//getReport
getReports(app, Reports, verifyJWT, verifyAdmin)
app.get("/", (req, res) => {
    res.send("server is running")
})

//deleteReports
deleteReport(app, Reports, verifyJWT, verifyAdmin)

//listen api
app.listen(port, () => {
    console.log("server is on")
})

