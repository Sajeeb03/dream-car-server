const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require("jsonwebtoken");
require("dotenv").config()

const stripe = require("stripe")(process.env.PAY_SECRET_KEY);

const port = process.env.PORT || 5000;
const app = express();

//middle wares
app.use(cors());
app.use(express.json());
const { verifyToken, isAdmin, isSeller, isBuyer } = require('./MiddleWares/middleWares');

const verifyJWT = verifyToken(jwt);


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
const Payments = client.db('Dream-car').collection("payments");        


//checking middle ware
const verifyAdmin = isAdmin(Users);
const verifySeller = isSeller(Users);
const verifyBuyer = isBuyer(Users);




//api
const { getClientSecret, savePayment } = require('./Api/Payments/paymentsApi');
const { getOrders, getOrder, postOrder } = require('./Api/Orders/Orders');
const { postReport, getReports, deleteReport } = require('./Api/Reports/reports');
const { postUser, getUsers, deleteUser, getSellerDetails } = require('./Api/Users/users');
const { getProducts, getMyProducts, postProducts, deleteProduct, updateProduct, categories } = require('./Api/Products/products');
const { checkAdmin, checkSeller, verification, checkBuyer, generateToken } = require('./Api/Verification/verification');
const { postAdvertisement, getAdvertisement } = require('./Api/Advertisements/advertisements');



//categories get api
categories(app, Categories, verifyJWT)

//post user while login
postUser(app, Users)

//getUsers
getUsers(app, Users, verifyJWT, verifyAdmin);

// delete user
deleteUser(app, Users, verifyJWT, verifyAdmin)

//check admin
checkAdmin(app, Users)


//check seller route
checkSeller(app, Users)

//verify seller
verification(app, Users, Products, verifyJWT, verifyAdmin)
//check buyer
checkBuyer(app, Users)

//post product i mean car

postProducts(app, Products, verifyJWT, verifySeller);

//delete product
deleteProduct(app, Products, Advertise, verifyJWT, verifySeller)

//getMyProducts
getMyProducts(app, Products, verifyJWT, verifySeller);

//get car with category name
getProducts(app, Products, verifyJWT);


//update product and remove advertisement
updateProduct(app, Products, Advertise, verifyJWT, verifySeller)


//jwt token
generateToken(app, jwt);


//getSellerDetails
getSellerDetails(app, verifyJWT, verifySeller, Users)

//advertise item 
postAdvertisement(app, Advertise, Products, verifyJWT, verifySeller)

//get advertisement
getAdvertisement(app, Advertise);




//post order
postOrder(app, Orders, verifyJWT, verifyBuyer);

//getOrder
getOrders(app, Orders, verifyJWT, verifyBuyer);


//get orderby id 
getOrder(app, Orders, verifyJWT, verifyBuyer);

//post report
postReport(app, Reports, verifyJWT);

//getReport
getReports(app, Reports, verifyJWT, verifyAdmin)

//deleteReports
deleteReport(app, Reports, Products, Advertise, verifyJWT, verifyAdmin)


//get client secret 
getClientSecret(app, verifyJWT, stripe);

//save payment details to db
savePayment(app, Payments, Orders, verifyJWT)

app.get("/", (req, res) => {
    res.send("server is running")
})


//listen api
app.listen(port, () => {
    console.log("server is on")
})



