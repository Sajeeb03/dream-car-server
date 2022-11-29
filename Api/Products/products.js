const { ObjectId } = require("mongodb");

const categories = (app, Categories) => {
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
}

//post products
const postProducts = (app, Products, verifyJWT, verifySeller) => {
    app.post('/cars', verifyJWT, verifySeller, async (req, res) => {
        try {
            const product = req.body;
            const result = await Products.insertOne(product);
            res.send({
                success: true,
                message: 'Car added.'
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

//update product 
const updateProduct = (app, Products, Advertise, verifyJWT, verifySeller) => {
    app.put('/cars/:id', verifyJWT, verifySeller, async (req, res) => {
        try {
            const { id } = req.params;
            const filter = { _id: ObjectId(id) }
            const updateProduct = {
                $set: req.body
            }
            const result = await Products.updateOne(filter, updateProduct, { upsert: true })
            const deleteItem = await Advertise.deleteOne({ carId: id })
            res.send({
                success: true,
                message: "Status updated"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

//get products
const getProducts = (app, Products, verifyJWT) => {
    app.get("/cars/:category", verifyJWT, async (req, res) => {
        try {
            const { category } = req.params;
            const query = { category: category };
            const result = await Products.find(query).toArray();
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
}

//get individual users products
const getMyProducts = (app, Products, verifyJWT, verifySeller) => {
    app.get("/cars", verifyJWT, verifySeller, async (req, res) => {
        try {
            const email = req.query.email;
            const query = { sellerEmail: email };
            const result = await Products.find(query).toArray();
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

}


//delete the car from db
const deleteProduct = (app, Products, Advertise, verifyJWT, verifySeller) => {
    app.delete("/cars/:id", verifyJWT, verifySeller, async (req, res) => {
        try {
            const { id } = req.params;
            const query = { _id: ObjectId(id) };
            const result = await Products.deleteOne(query);
            const deleteItem = await Advertise.deleteOne({ carId: id });
            res.send({
                success: true,
                message: "Deletion successful"
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = { categories, postProducts, updateProduct, getProducts, getMyProducts, deleteProduct };