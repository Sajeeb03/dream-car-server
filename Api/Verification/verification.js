const { ObjectId } = require("mongodb");

const generateToken = (app, jwt) => {
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

}

//check if the user is admin or not
const checkAdmin = (app, Users) => {
    app.get("/users/admin/:email", async (req, res) => {
        try {
            const { email } = req.params;
            const user = await Users.findOne({ email: email })
            res.send({ isAdmin: user.role === "admin" })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

//check if the user is buyer or not 
const checkBuyer = (app, Users) => {
    app.get("/users/buyer/:email", async (req, res) => {
        try {
            const { email } = req.params;
            const user = await Users.findOne({ email: email })
            res.send({ isBuyer: user.role === "buyer" })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

//check if the user is seller or not
const checkSeller = (app, Users) => {
    app.get("/users/seller/:email", async (req, res) => {
        try {
            const { email } = req.params;
            const user = await Users.findOne({ email: email })
            res.send({ isSeller: user.role === "seller" })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}


//verify the seller to put a blue tick
const verification = (app, Users, Products, verifyJWT, verifyAdmin) => {
    app.put("/seller/:id", verifyJWT, verifyAdmin, async (req, res) => {
        try {
            const { id } = req.params;
            // console.log(id)
            // console.log(req.decoded.email)
            const query = { _id: ObjectId(id) };
            const updateUser = {
                $set: req.body
            }
            const result = await Users.updateOne(query, updateUser, { upsert: true })
            const filter = { sellerId: id }
            const productsUpdate = await Products.updateMany(filter, updateUser, { upsert: true })
            res.send({
                success: true,
                message: "Verified"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}


module.exports = { generateToken, checkAdmin, checkBuyer, checkSeller, verification };